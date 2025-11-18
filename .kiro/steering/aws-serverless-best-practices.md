---
inclusion: always
---

# AWS Serverless Best Practices

## Lambda Function Configuration

**Runtime & Performance**
- Use Node.js 20.x runtime for latest features and performance
- Set appropriate timeout (default: 10 seconds for API functions)
- Configure memory based on function needs (default: 768 MB)
- Enable connection reuse: `AWS_NODEJS_CONNECTION_REUSE_ENABLED: 1`

**Handler Pattern**
- Use ES modules (`.mjs` extension) for modern JavaScript features
- Export handler as named export: `export const handler = ...`
- Wrap handlers with Powertools middleware for observability

**Build Configuration**
- Use ESBuild for fast, efficient bundling
- Build method: `esbuild` with SAM metadata
- Format: ES modules (`esm`)
- Target: `es2020` for Node.js 20.x compatibility
- Externalize AWS SDK v3 clients to reduce bundle size
- Add require shim for ESM compatibility:
  ```javascript
  import { createRequire } from 'module';
  const require = createRequire(import.meta.url);
  ```

## API Gateway Best Practices

**Authentication & Authorization**
- Use Cognito authorizers for user authentication
- Define default authorizer at API level for consistent security
- Store Cognito configuration in SSM Parameter Store
- Use appropriate auth flows (USER_PASSWORD_AUTH, REFRESH_TOKEN_AUTH)

**Request Validation**
- Enable request validation at API Gateway level
- Define validation rules in OpenAPI specification
- Use `x-amazon-apigateway-request-validator` on all endpoints
- Validate body, query parameters, and headers

**Gateway Responses**
- Customize error responses for better client experience
- Always include CORS headers in gateway responses
- Define standard responses for: BAD_REQUEST_BODY, UNAUTHORIZED, ACCESS_DENIED
- Use consistent error message format

**Integration**
- Use `aws_proxy` integration type for Lambda functions
- Reference Lambda ARN using CloudFormation intrinsic functions
- Let Lambda handle response formatting for flexibility

## Observability with Lambda Powertools

**Logger**
- Use structured logging with Lambda Powertools Logger
- Enable log buffering for better performance
- Add persistent attributes (account ID, region) for context
- Set service name via environment variable: `POWERTOOLS_SERVICE_NAME`
- Log events automatically with `logEvent: true`
- Clear state between invocations: `clearState: true`

**Metrics**
- Define metrics namespace: `POWERTOOLS_METRICS_NAMESPACE`
- Add default dimensions (account ID, region)
- Capture cold start metrics automatically
- Use `logMetrics` middleware to publish metrics

**Tracer**
- Enable X-Ray tracing with Powertools Tracer
- Use `captureLambdaHandler` middleware
- Tracer automatically instruments AWS SDK calls

**Middleware Order**
- Apply middleware in correct order using Middy:
  1. `captureLambdaHandler(tracer)` - First for complete trace
  2. `logMetrics(metrics)` - Second for metric capture
  3. `injectLambdaContext(logger)` - Last for logging context

## Error Handling

**Structured Error Responses**
- Use shared response utility for consistent formatting
- Always include appropriate status codes
- Return meaningful error messages
- Log errors with full stack traces using Powertools logger

**Error Categories**
- 400: Client errors (validation, bad request)
- 401/403: Authentication/authorization errors
- 500: Server errors (unhandled exceptions)

**Try-Catch Pattern**
```javascript
try {
  // Business logic
  return getResponse(200, result);
} catch (err) {
  logger.error(err, err.stack);
  return getResponse(500, { message: 'Something went wrong!' });
}
```

## Configuration Management

**Environment Variables**
- Define global environment variables in SAM template
- Use environment variables for service configuration
- Store sensitive data in Secrets Manager or Parameter Store
- Reference SSM parameters in CloudFormation template

**Parameter Store**
- Use SSM Parameter Store for cross-stack configuration
- Reference parameters with type: `AWS::SSM::Parameter::Value<String>`
- Organize parameters with consistent naming (e.g., `/service-name/ParameterName`)

## Shared Code Pattern

**Avoid Lambda Layers**
- Bundle shared code directly with functions using ESBuild
- Faster cold starts compared to layers
- Simpler dependency management
- Better version control

**Shared Module Structure**
- Place shared code in `src/functions/shared/`
- Import using relative paths
- Keep shared modules focused and single-purpose
- Examples: API response formatting, Powertools initialization, middleware

## Security Best Practices

**IAM Policies**
- Follow least privilege principle
- Use managed policies when appropriate (e.g., `AWSLambdaBasicExecutionRole`)
- Define specific permissions for resource access
- Avoid wildcards in production

**CORS Configuration**
- Configure CORS headers in API Gateway responses
- Set appropriate `Access-Control-Allow-Origin` values
- Include CORS headers in error responses

**Secrets Management**
- Never hardcode credentials
- Use AWS Secrets Manager for sensitive data
- Use IAM roles for AWS service authentication
- Rotate secrets regularly

## Deployment Best Practices

**Infrastructure as Code**
- Use SAM templates for all infrastructure
- Version control all configuration
- Use CloudFormation outputs for resource references
- Parameterize environment-specific values

**CI/CD**
- Automate deployments with GitHub Actions
- Use separate environments (sandbox, staging, production)
- Store deployment credentials as GitHub secrets
- Run tests before deployment

**Build Process**
1. Install dependencies: `npm install`
2. Run tests: `npm test`
3. Lint code: `npm run lint`
4. Lint API spec: `npm run lint-api`
5. Build SAM: `sam build`
6. Deploy: `sam deploy`

## Cost Optimization

**Function Configuration**
- Right-size memory allocation (test different values)
- Set appropriate timeouts (avoid excessive values)
- Use ARM64 architecture when possible for better price/performance

**API Gateway**
- Use caching for frequently accessed data
- Implement throttling to prevent abuse
- Monitor usage patterns for optimization opportunities

**Monitoring**
- Track Lambda duration and memory usage
- Monitor API Gateway request counts
- Set up CloudWatch alarms for anomalies
- Use Cost Explorer to track serverless costs
