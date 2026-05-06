output "s3_bucket_name" {
  description = "Name of the S3 bucket holding site assets"
  value       = aws_s3_bucket.site.id
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID (used for cache invalidations)"
  value       = aws_cloudfront_distribution.site.id
}

output "cloudfront_domain" {
  description = "CloudFront distribution domain name"
  value       = aws_cloudfront_distribution.site.domain_name
}

output "website_url" {
  description = "Final website URL"
  value       = "https://${local.primary_fqdn}"
}

output "nameservers" {
  description = "Route 53 hosted zone nameservers — point your registrar here"
  value       = data.aws_route53_zone.site.name_servers
}
