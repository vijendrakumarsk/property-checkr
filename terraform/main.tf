locals {
  # Prefix bucket name with environment to keep dev/prod isolated
  bucket_name  = "${var.environment}-${replace(var.domain_name, ".", "-")}-site"
  primary_fqdn = var.www_redirect_to_apex ? var.domain_name : "www.${var.domain_name}"
  redirect_fqdn = var.www_redirect_to_apex ? "www.${var.domain_name}" : var.domain_name

  # CloudFront alternate domain names — both apex and www point to the same distribution
  cf_aliases = [var.domain_name, "www.${var.domain_name}"]
}

# ─── S3 ──────────────────────────────────────────────────────────────────────

resource "aws_s3_bucket" "site" {
  bucket        = local.bucket_name
  force_destroy = var.environment == "dev" ? true : false
}

resource "aws_s3_bucket_versioning" "site" {
  bucket = aws_s3_bucket.site.id
  versioning_configuration {
    status = "Enabled"
  }
}

# Block all public access — CloudFront uses OAC instead
resource "aws_s3_bucket_public_access_block" "site" {
  bucket                  = aws_s3_bucket.site.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_server_side_encryption_configuration" "site" {
  bucket = aws_s3_bucket.site.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# ─── CloudFront Origin Access Control ────────────────────────────────────────

resource "aws_cloudfront_origin_access_control" "site" {
  name                              = "${local.bucket_name}-oac"
  description                       = "OAC for ${var.domain_name} (${var.environment})"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

# Bucket policy — allow CloudFront service principal via OAC
resource "aws_s3_bucket_policy" "site" {
  bucket = aws_s3_bucket.site.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "AllowCloudFrontServicePrincipal"
        Effect = "Allow"
        Principal = {
          Service = "cloudfront.amazonaws.com"
        }
        Action   = "s3:GetObject"
        Resource = "${aws_s3_bucket.site.arn}/*"
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = aws_cloudfront_distribution.site.arn
          }
        }
      }
    ]
  })
}

# ─── ACM Certificate (must be us-east-1) ─────────────────────────────────────

resource "aws_acm_certificate" "site" {
  provider                  = aws.us_east_1
  domain_name               = var.domain_name
  subject_alternative_names = ["www.${var.domain_name}"]
  validation_method         = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

# ─── Route 53 ────────────────────────────────────────────────────────────────

data "aws_route53_zone" "site" {
  name         = var.domain_name
  private_zone = false
}

# ACM DNS validation records
resource "aws_route53_record" "cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.site.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      type   = dvo.resource_record_type
      record = dvo.resource_record_value
    }
  }

  zone_id = data.aws_route53_zone.site.zone_id
  name    = each.value.name
  type    = each.value.type
  ttl     = 60
  records = [each.value.record]
}

resource "aws_acm_certificate_validation" "site" {
  provider                = aws.us_east_1
  certificate_arn         = aws_acm_certificate.site.arn
  validation_record_fqdns = [for r in aws_route53_record.cert_validation : r.fqdn]
}

# ─── CloudFront Cache Policies ────────────────────────────────────────────────

# index.html — no caching (always fresh)
resource "aws_cloudfront_cache_policy" "no_cache" {
  name        = "${local.bucket_name}-no-cache"
  min_ttl     = 0
  default_ttl = 0
  max_ttl     = 0

  parameters_in_cache_key_and_forwarded_to_origin {
    cookies_config {
      cookie_behavior = "none"
    }
    headers_config {
      header_behavior = "none"
    }
    query_strings_config {
      query_string_behavior = "none"
    }
  }
}

# Hashed assets — long-lived (1 year)
resource "aws_cloudfront_cache_policy" "long_cache" {
  name        = "${local.bucket_name}-long-cache"
  min_ttl     = 0
  default_ttl = 86400      # 1 day default
  max_ttl     = 31536000   # 1 year max

  parameters_in_cache_key_and_forwarded_to_origin {
    cookies_config {
      cookie_behavior = "none"
    }
    headers_config {
      header_behavior = "none"
    }
    query_strings_config {
      query_string_behavior = "none"
    }
    enable_accept_encoding_gzip   = true
    enable_accept_encoding_brotli = true
  }
}

# ─── CloudFront Function: www ↔ apex redirect ─────────────────────────────────

resource "aws_cloudfront_function" "redirect" {
  name    = "${local.bucket_name}-redirect"
  runtime = "cloudfront-js-2.0"
  comment = "Redirect ${local.redirect_fqdn} → ${local.primary_fqdn}"
  publish = true

  code = <<-EOF
    async function handler(event) {
      const request = event.request;
      const host = request.headers.host ? request.headers.host.value : '';
      const redirectFrom = '${local.redirect_fqdn}';
      const redirectTo   = 'https://${local.primary_fqdn}';

      if (host === redirectFrom) {
        return {
          statusCode: 301,
          statusDescription: 'Moved Permanently',
          headers: {
            location: { value: redirectTo + request.uri }
          }
        };
      }
      return request;
    }
  EOF
}

# ─── CloudFront Distribution ──────────────────────────────────────────────────

resource "aws_cloudfront_distribution" "site" {
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  aliases             = local.cf_aliases
  price_class         = var.environment == "prod" ? "PriceClass_All" : "PriceClass_100"
  comment             = "${var.domain_name} (${var.environment})"

  origin {
    domain_name              = aws_s3_bucket.site.bucket_regional_domain_name
    origin_id                = "s3-${local.bucket_name}"
    origin_access_control_id = aws_cloudfront_origin_access_control.site.id
  }

  # Default behaviour — serves index.html with no-cache for SPA entry point
  default_cache_behavior {
    target_origin_id       = "s3-${local.bucket_name}"
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD"]
    cache_policy_id        = aws_cloudfront_cache_policy.no_cache.id
    compress               = true

    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.redirect.arn
    }
  }

  # Hashed static assets — long-lived cache
  # Matches /assets/*, *.js, *.css, *.woff2, *.png, *.jpg, *.svg, *.ico
  ordered_cache_behavior {
    path_pattern           = "/assets/*"
    target_origin_id       = "s3-${local.bucket_name}"
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    cache_policy_id        = aws_cloudfront_cache_policy.long_cache.id
    compress               = true
  }

  ordered_cache_behavior {
    path_pattern           = "*.js"
    target_origin_id       = "s3-${local.bucket_name}"
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    cache_policy_id        = aws_cloudfront_cache_policy.long_cache.id
    compress               = true
  }

  ordered_cache_behavior {
    path_pattern           = "*.css"
    target_origin_id       = "s3-${local.bucket_name}"
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    cache_policy_id        = aws_cloudfront_cache_policy.long_cache.id
    compress               = true
  }

  # SPA routing — return index.html for any 403/404 from S3
  custom_error_response {
    error_code            = 403
    response_code         = 200
    response_page_path    = "/index.html"
    error_caching_min_ttl = 0
  }

  custom_error_response {
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
    error_caching_min_ttl = 0
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate_validation.site.certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  depends_on = [aws_acm_certificate_validation.site]
}

# ─── Route 53 DNS Records ─────────────────────────────────────────────────────

# Apex domain → CloudFront
resource "aws_route53_record" "apex" {
  zone_id = data.aws_route53_zone.site.zone_id
  name    = var.domain_name
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.site.domain_name
    zone_id                = aws_cloudfront_distribution.site.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "apex_aaaa" {
  zone_id = data.aws_route53_zone.site.zone_id
  name    = var.domain_name
  type    = "AAAA"

  alias {
    name                   = aws_cloudfront_distribution.site.domain_name
    zone_id                = aws_cloudfront_distribution.site.hosted_zone_id
    evaluate_target_health = false
  }
}

# www → CloudFront (same distribution handles the redirect via CloudFront Function or just serves same content)
resource "aws_route53_record" "www" {
  zone_id = data.aws_route53_zone.site.zone_id
  name    = "www.${var.domain_name}"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.site.domain_name
    zone_id                = aws_cloudfront_distribution.site.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www_aaaa" {
  zone_id = data.aws_route53_zone.site.zone_id
  name    = "www.${var.domain_name}"
  type    = "AAAA"

  alias {
    name                   = aws_cloudfront_distribution.site.domain_name
    zone_id                = aws_cloudfront_distribution.site.hosted_zone_id
    evaluate_target_health = false
  }
}


