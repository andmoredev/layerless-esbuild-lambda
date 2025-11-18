---
inclusion: always
---

# Product Overview

## Current Product Features

This is a serverless API built with AWS SAM (Serverless Application Model) that demonstrates layerless Lambda functions using ESBuild for bundling. The product showcases modern serverless best practices for building secure, scalable APIs.

### Core Features

**Echo API Endpoint**
- POST /echo endpoint that accepts JSON payloads and returns them unchanged
- Demonstrates basic Lambda function implementation with shared utilities
- Includes comprehensive error handling with standardized responses

**Authentication & Authorization**
- Amazon Cognito integration for user authentication
- User-password authentication flow support
- JWT token-based authorization on API Gateway
- Cognito User Pool Client configured for password and refresh token flows

**Observability & Monitoring**
- AWS Lambda Powertools integration for structured logging, metrics, and tracing
- Logger with persistent attributes (AWS account ID, region)
- Metrics with custom dimensions
- X-Ray tracing for distributed request tracking
- Middy middleware for consistent observability across functions

**API Documentation**
- OpenAPI 3.0 specification defining all endpoints
- Spectral linting for API specification quality
- Postman collection for API testing
- Request validation at API Gateway level

**Testing & Quality**
- Unit tests using Mocha and Chai
- Code coverage reporting with c8
- ESLint for code quality
- Automated testing in CI/CD pipeline

### Architecture Patterns

**Layerless Design**
- Functions bundle dependencies using ESBuild instead of Lambda Layers
- Faster cold starts and simpler dependency management
- Shared code through local modules in `src/functions/shared`

**Shared Utilities**
- API Gateway response formatting utilities
- Powertools initialization wrapper for consistent middleware setup
- Reusable across all Lambda functions

**Infrastructure as Code**
- SAM template defining all AWS resources
- CloudFormation for deployment
- SSM Parameter Store for configuration management
- GitHub Actions for CI/CD deployment

### Technology Stack

- Runtime: Node.js 20.x
- Build Tool: ESBuild with ES modules
- Framework: AWS SAM
- Authentication: Amazon Cognito
- Observability: AWS Lambda Powertools
- Middleware: Middy
- Testing: Mocha, Chai, c8
- API Specification: OpenAPI 3.0
- Linting: ESLint, Spectral

### Deployment Options

1. Manual deployment using SAM CLI
2. Automated deployment via GitHub Actions to sandbox environment
3. Support for multiple environments through SAM configuration
