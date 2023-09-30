provider "aws" {
  region = "us-east-2"
}

terraform {
  backend "s3" {
    bucket = "survivor-pool-terraform-us-east-2"
    key    = "survivor-pool"
    region = "us-east-2"
  }
}
