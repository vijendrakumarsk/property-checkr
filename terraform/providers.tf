terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # Uncomment and configure for remote state (recommended for teams)
  # backend "s3" {
  #   bucket         = "your-tfstate-bucket"
  #   key            = "static-site/${var.environment}/terraform.tfstate"
  #   region         = "ap-southeast-2"
  #   dynamodb_table = "terraform-locks"
  #   encrypt        = true
  # }
}

# Primary provider — S3, CloudFront OAC, Route 53
provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Environment = var.environment
      ManagedBy   = "terraform"
      Project     = var.domain_name
    }
  }
}

# ACM certificates for CloudFront MUST be in us-east-1
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"

  default_tags {
    tags = {
      Environment = var.environment
      ManagedBy   = "terraform"
      Project     = var.domain_name
    }
  }
}
