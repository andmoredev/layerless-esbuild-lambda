---
inclusion: always
---

# OpenAPI Best Practices

## Spectral Linting Rules

This project enforces strict OpenAPI quality standards using Spectral. All rules are configured in `.spectral.yaml`.

## Required Information (ERROR Level)

**API Metadata**
- `info-contact`: Contact information must be provided
- `info-description`: API description is required
- `openapi-tags`: At least one tag must be defined
- `tag-description`: All tags must have descriptions

**Operation Requirements**
- `operation-description`: Every operation must have a description
- `operation-operationId`: Every operation must have an operationId
- `operation-operationId-unique`: Operation IDs must be unique across the API
- `operation-operationId-valid-in-url`: Operation IDs must be URL-safe
- `operation-tags`: Every operation must have at least one tag
- `operation-singular-tag`: Operations should have exactly one tag
- `operation-tag-defined`: Tags used in operations must be defined in global tags
- `operation-success-response`: Every operation must define a success response (2xx)
- `operation-parameters`: Parameters must be properly defined

**Path Requirements**
- `path-declarations-must-exist`: Path parameters must be defined
- `path-keys-no-trailing-slash`: Paths must not have trailing slashes
- `path-not-include-query`: Query parameters must not be in path strings
- `path-params`: Path parameters must be used correctly

**Schema Requirements**
- `oas3-schema`: Schemas must be valid according to OpenAPI 3.0 specification
- `oas3-parameter-description`: All parameters must have descriptions
- `typed-enum`: Enum values must match the property type
- `duplicated-entry-in-enum`: Enum values must be unique
- `no-$ref-siblings`: $ref cannot have sibling properties

**Server Configuration**
- `oas3-api-servers`: At least one server must be defined
- `oas3-server-not-example.com`: Server URL must not be example.com (except in examples)
- `oas3-server-trailing-slash`: Server URLs must not have trailing slashes

**Security**
- `oas3-operation-security-defined`: Security schemes used must be defined in components

**Examples & Validation**
- `oas3-examples-value-or-externalValue`: Examples must have value or externalValue
- `oas3-valid-media-example`: Media type examples must be valid
- `oas3-valid-schema-example`: Schema examples must match the schema

**Code Quality**
- `no-eval-in-markdown`: Markdown must not contain eval()
- `no-script-tags-in-markdown`: Markdown must not contain script tags
- `oas3-unused-component`: All defined components must be used

## Naming Conventions (ERROR Level)

**Operation IDs**
- Must use camelCase (e.g., `getUserProfile`, `createOrder`)
- Rule: `openapi-v3-operations-operation-ids-camel-case`

**Query Parameters**
- Must use kebab-case (e.g., `user-id`, `order-status`)
- Rule: `openapi-v3-query-parameters-kebab-case`

**Component Keys**
- Must use camelCase (e.g., `userProfile`, `orderDetails`)
- Rule: `openapi-v3-component-keys-camel-case`
- Applies to all component types (schemas, responses, parameters, etc.)

**Property Keys**
- Must use camelCase (e.g., `firstName`, `emailAddress`)
- Rule: `openapi-v3-property-keys-camel-case`

**Path Names**
- Must use kebab-case with path parameters in braces
- Pattern: `/path-segment/{pathParameter}/another-segment`
- Rule: `openapi-v3-path-camel-case`
- Allowed characters: lowercase letters, numbers, hyphens, dots, slashes, and {braces}

## AWS API Gateway Integration

**Request Validation**
- Every endpoint MUST include `x-amazon-apigateway-request-validator`
- Rule: `openapi-v3-post-put-patch-endpoint-requires-x-amazon-apigateway-request-validator`
- Define validators in `x-amazon-apigateway-request-validators` at root level

**Gateway Responses**
- Define custom gateway responses in `x-amazon-apigateway-gateway-responses`
- Always include CORS headers in response parameters
- Customize error messages for better client experience
- Standard responses: BAD_REQUEST_BODY, UNAUTHORIZED, ACCESS_DENIED

**Lambda Integration**
- Use `x-amazon-apigateway-integration` for each operation
- Integration type: `aws_proxy` for Lambda proxy integration
- Reference Lambda ARN using CloudFormation intrinsic functions
- HTTP method: `POST` for Lambda invocations

## Schema Best Practices (WARN Level)

**Number Boundaries**
- Numeric types should define minimum and maximum values
- Rule: `openapi-v3-schema-properties-define-number-boundaries`
- Helps with validation and documentation

## Standard Response Patterns

**Success Responses**
- Always define 200 or 201 responses for successful operations
- Include response schema with examples
- Document all possible response fields

**Error Responses**
- Define standard error responses in components
- Reuse error schemas using $ref
- Common errors: 400 (badRequest), 401/403 (unauthorized), 500 (unexpectedError)
- Always include a `message` property in error responses

**Response Structure**
```yaml
components:
  responses:
    badRequest:
      description: Bad Request
      content:
        application/json:
          schema:
            type: object
            required:
              - message
            properties:
              message:
                type: string
```

## Documentation Standards

**Operation Documentation**
- Provide clear, concise descriptions for each operation
- Use the `description` field with markdown formatting
- Include usage examples when helpful
- Document expected behavior and side effects

**Tag Organization**
- Group related operations under meaningful tags
- Provide descriptions for each tag
- Use tags to organize API documentation
- One tag per operation for clarity

**Schema Documentation**
- Document all schema properties
- Include examples for complex types
- Use `description` fields for clarity
- Define required vs optional fields explicitly

## Request Body Specifications

**Content Types**
- Specify content type (typically `application/json`)
- Define request body schema
- Mark required properties
- Include examples for complex requests

**Validation**
- Use JSON Schema validation features
- Define patterns for string formats
- Set min/max for numbers and arrays
- Use enums for fixed value sets

## Reusability

**Component References**
- Define reusable schemas in `components/schemas`
- Define reusable responses in `components/responses`
- Define reusable parameters in `components/parameters`
- Use $ref to reference components
- Avoid duplication across the specification

**Consistency**
- Use consistent naming across the API
- Follow the same patterns for similar operations
- Reuse common response structures
- Maintain consistent error handling

## Testing & Validation

**Spectral Linting**
- Run `npm run lint-api` before committing changes
- Fix all ERROR level issues (build will fail)
- Address WARN level issues when possible
- Validate OpenAPI spec is syntactically correct

**Postman Integration**
- Maintain Postman collection in sync with OpenAPI spec
- Use Portman for automated collection generation
- Test all endpoints with realistic data
- Validate response schemas match specification

## Version Control

**API Versioning**
- Include version in `info.version`
- Use semantic versioning (MAJOR.MINOR.PATCH)
- Document breaking changes in descriptions
- Consider URL versioning for major changes

**Change Management**
- Review OpenAPI changes in pull requests
- Ensure backward compatibility when possible
- Document API changes in commit messages
- Update Postman collections when API changes

## Disabled Rules

The following Spectral rules are explicitly disabled:
- `openapi-tags-alphabetical`: Tags don't need alphabetical ordering
- `contact-properties`: Contact object properties are flexible
- `info-license`: License information is optional
- `license-url`: License URL is optional

These are disabled to reduce noise while maintaining essential quality standards.
