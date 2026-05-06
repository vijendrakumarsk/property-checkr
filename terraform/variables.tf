variable "domain_name" {
  description = "The apex domain name (e.g. example.com)"
  type        = string
}

variable "aws_region" {
  description = "Primary AWS region for S3 and other resources"
  type        = string
  default     = "ap-southeast-2"
}

variable "environment" {
  description = "Deployment environment (dev or prod)"
  type        = string
  validation {
    condition     = contains(["dev", "prod"], var.environment)
    error_message = "environment must be 'dev' or 'prod'."
  }
}

variable "build_output_dir" {
  description = "Local path to the built site output directory"
  type        = string
  default     = "dist/public"
}

variable "www_redirect_to_apex" {
  description = "If true, www redirects to apex. If false, apex redirects to www."
  type        = bool
  default     = true
}
