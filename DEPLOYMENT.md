# Deployment Guide

Complete step-by-step guide for deploying your static site to AWS.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [AWS Account Setup](#aws-account-setup)
3. [GitHub Actions Setup](#github-actions-setup)
4. [First Deployment](#first-deployment)
5. [DNS Configuration](#dns-configuration)
6. [Verification](#verification)
7. [Ongoing Deployments](#ongoing-deployments)

## Prerequisites

- AWS account with billing enabled
- Domain name registered (can be with any registrar)
- GitHub repository with your site code
- Local machine with:
  - AWS CLI v2 installed
  - Terraform >= 1.5.0 installed
  - Node.js >= 18 installed

## AWS Account Setup

### Step 1: Create Route 53 Hosted Zone

```bash
# Create hosted zone for your domain
aws route53 create-hosted-zone \
  --name example.com \
  --caller-reference $(date +%s)

# Note the nameservers from the output — you'll need these later
```

### Step 2: Set Up GitHub Actions OIDC Provider

This allows GitHub Actions to authenticate with AWS without storing long-lived credentials.

```bash
# Create the OIDC provider (once per AWS account)
aws iam create-open-id-connect-provider \
  --url https://token.actions.githubusercontent.com \
  --client-id-list sts.amazonaws.com \
  --thumbprint-list 6938fd4d98bab03faadb97b34396831e3780aea1
```

### Step 3: Create IAM Role for GitHub Actions

```bash
# Get your AWS account ID
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

# Edit terraform/iam-oidc-trust-policy.json
# Replace:
#   YOUR_ACCOUNT_ID → your actual account ID
#   YOUR_GITHUB_ORG → your GitHub username or org
#   YOUR_REPO → your repository name

# Create the role
aws iam create-role \
  --role-name github-actions-static-site-deploy \
  --assume-role-policy-document file://terraform/iam-oidc-trust-policy.json

# Attach permissions
aws iam put-role-policy \
  --role-name github-actions-static-site-deploy \
  --policy-name StaticSiteDeployPolicy \
  --policy-document file://terraform/iam-github-actions-policy.json

# Get the role ARN (save this for GitHub Secrets)
aws iam get-role \
  --role-name github-actions-static-site-deploy \
  --query 'Role.Arn' \
  --output text
```

## GitHub Actions Setup

### Step 4: Configure GitHub Secrets

Navigate to your repository → Settings → Secrets and variables → Actions → New repository secret

Add these secrets:

| Secret Name | Value | Example |
|-------------|-------|---------|
| `AWS_DEPLOY_ROLE_ARN` | IAM role ARN from Step 3 | `arn:aws:iam::123456789012:role/github-actions-static-site-deploy` |
| `AWS_REGION` | Your primary AWS region | `ap-southeast-2` |
| `TF_VARS_FILE` | Terraform vars file to use | `prod.tfvars` |
| `BUILD_OUTPUT_DIR` | Build output directory | `dist` |

### Step 5: Update Terraform Variables

Edit `terraform/prod.tfvars`:

```hcl
environment      = "prod"
domain_name      = "example.com"          # ← Your actual domain
aws_region       = "ap-southeast-2"
build_output_dir = "dist"
www_redirect_to_apex = true               # true = www→apex, false = apex→www
```

For dev environment, edit `terraform/dev.tfvars`:

```hcl
environment      = "dev"
domain_name      = "dev.example.com"      # ← Your dev subdomain
aws_region       = "ap-southeast-2"
build_output_dir = "dist"
www_redirect_to_apex = true
```

## First Deployment

### Step 6: Bootstrap Infrastructure Locally

Before GitHub Actions can deploy, run Terraform once locally to create the infrastructure:

```bash
# Configure AWS CLI with your credentials
aws configure

# Initialize Terraform
cd terraform
terraform init

# Preview changes
terraform plan -var-file="prod.tfvars"

# Apply (creates S3, CloudFront, ACM cert, Route 53 records)
terraform apply -var-file="prod.tfvars"

# Save the outputs
terraform output
```

This will take 5-10 minutes. The ACM certificate validation is the slowest part.

### Step 7: Initial Site Upload

```bash
# Build your site
cd ..
npm install
npm run build

# Get bucket name from Terraform output
BUCKET_NAME=$(cd terraform && terraform output -raw s3_bucket_name)

# Sync to S3
aws s3 sync dist/public/ s3://$BUCKET_NAME/ \
  --cache-control "no-cache, no-store, must-revalidate"

# Get CloudFront distribution ID
CF_ID=$(cd terraform && terraform output -raw cloudfront_distribution_id)

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id $CF_ID \
  --paths "/*"
```

## DNS Configuration

### Step 8: Update Domain Nameservers

```bash
# Get Route 53 nameservers
cd terraform
terraform output nameservers
```

You'll see output like:

```
[
  "ns-123.awsdns-12.com",
  "ns-456.awsdns-45.net",
  "ns-789.awsdns-78.org",
  "ns-012.awsdns-01.co.uk"
]
```

Log in to your domain registrar (GoDaddy, Namecheap, Google Domains, etc.) and:

1. Find the DNS or Nameserver settings
2. Replace the existing nameservers with the four AWS nameservers above
3. Save changes

DNS propagation typically takes 15 minutes to 48 hours. Most registrars propagate within 1-2 hours.

## Verification

### Step 9: Test Your Deployment

```bash
# Check DNS propagation
dig +short NS example.com

# Should show the AWS nameservers from Step 8

# Check A record
dig +short example.com

# Should show CloudFront IP addresses

# Test HTTPS
curl -I https://example.com

# Should return HTTP/2 200 with CloudFront headers

# Test www redirect
curl -I https://www.example.com

# Should return 301 → https://example.com (if www_redirect_to_apex = true)

# Test SPA routing
curl -I https://example.com/some/deep/path

# Should return 200 (not 404)
```

### Step 10: Browser Testing

1. Visit `https://example.com` — should load your site
2. Visit `https://www.example.com` — should redirect to apex (or vice versa)
3. Visit `https://example.com/nonexistent/path` — should load index.html (SPA routing)
4. Check browser DevTools → Network → Headers:
   - `x-cache: Hit from cloudfront` (after first load)
   - `cache-control: no-cache` for index.html
   - `cache-control: public, max-age=31536000` for /assets/*

## Ongoing Deployments

### Automatic Deployments via GitHub Actions

Every push to `main` branch will:

1. Install dependencies
2. Build the site
3. Run `terraform plan`
4. Run `terraform apply`
5. Sync build output to S3
6. Invalidate CloudFront cache

Check the Actions tab in your GitHub repo to monitor deployments.

### Manual Deployments

```bash
# Build
npm run build

# Get outputs
cd terraform
BUCKET_NAME=$(terraform output -raw s3_bucket_name)
CF_ID=$(terraform output -raw cloudfront_distribution_id)

# Sync hashed assets (long-lived cache)
aws s3 sync ../dist/assets s3://$BUCKET_NAME/assets \
  --cache-control "public, max-age=31536000, immutable" \
  --delete

# Sync everything else (no cache)
aws s3 sync ../dist s3://$BUCKET_NAME \
  --cache-control "no-cache, no-store, must-revalidate" \
  --exclude "assets/*" \
  --delete

# Invalidate
aws cloudfront create-invalidation \
  --distribution-id $CF_ID \
  --paths "/*"
```

### Deploy to Dev Environment

```bash
# Update GitHub secret TF_VARS_FILE to "dev.tfvars"
# OR run locally:

cd terraform
terraform apply -var-file="dev.tfvars"

# Then sync as above using the dev bucket name
```
