---
inclusion: always
---

# Testing Strategy

## Testing Framework

**Test Runner: Mocha**
- Use Mocha for running all tests
- Command: `npm test` runs all test files
- Test files pattern: `./**/tests/*.mjs`
- Tests are co-located with source code in `tests/` subdirectories

**Assertion Library: Chai**
- Use Chai's expect syntax for assertions
- Import: `import { expect } from 'chai';`
- Provides readable, expressive assertions
- Example: `expect(response.statusCode).to.equal(200);`

**Coverage Tool: c8**
- Use c8 for code coverage reporting
- Command: `npm run coverage`
- Configuration in `.c8rc` file
- Reporters: lcov and text output
- Excludes test files from coverage calculation

## Test File Organization

**Location**
- Place tests in `tests/` subdirectory within each function folder
- Structure: `src/functions/{function-name}/tests/`
- Test file naming: `{module-name}.tests.mjs`
- Main handler tests: `index.tests.mjs`

**Example Structure**
```
src/functions/echo/
├── index.mjs
└── tests/
    └── index.tests.mjs
```

## Test Patterns

**Describe Blocks**
- Organize tests using nested `describe` blocks
- Outer describe: Function or module name
- Inner describe: Method or handler name
- Example:
  ```javascript
  describe('Echo', () => {
    describe('handler', () => {
      // test cases
    });
  });
  ```

**Test Cases**
- Use `it` blocks for individual test cases
- Write descriptive test names that explain the scenario
- Test both success and failure paths
- Include edge cases and error conditions

**Example Test Structure**
```javascript
describe('Echo', () => {
  describe('handler', () => {
    it('Successfully echoes the request body', async () => {
      const response = await app.handler({
        body: JSON.stringify({ hello: 'world' })
      });
      
      expect(response.statusCode).to.equal(200);
      const body = JSON.parse(response.body);
      expect(body).to.have.property('hello', 'world');
    });

    it('Returns 500 for unhandled errors', async () => {
      const response = await app.handler();
      expect(response.statusCode).to.equal(500);
      const body = JSON.parse(response.body);
      expect(body).to.have.property('message', 'Something went wrong!');
    });
  });
});
```

## Lambda Handler Testing

**Direct Handler Invocation**
- Import handler directly from function module
- Call handler with mock event objects
- No need for Lambda runtime simulation
- Test synchronously with async/await

**Mock Event Objects**
- Create minimal event objects for testing
- Include only required properties for the test case
- Example: `{ body: JSON.stringify({ data }) }` for API Gateway events

**Response Validation**
- Verify status codes
- Parse and validate response body
- Check response headers when relevant
- Validate error messages and structure

## Coverage Requirements

**Configuration**
- Minimum coverage thresholds not enforced (can be added)
- Test files excluded from coverage: `**/*.tests.mjs`
- Coverage reports generated in `coverage/` directory
- LCOV format for CI/CD integration

**Coverage Reports**
- HTML report: `coverage/lcov-report/index.html`
- LCOV data: `coverage/lcov.info`
- Text summary in console output
- Review coverage reports to identify untested code paths

## Test Scenarios to Cover

**Success Paths**
- Valid input with expected output
- Different valid input variations
- Boundary conditions within valid range

**Error Paths**
- Invalid input (missing, malformed, wrong type)
- Unhandled exceptions
- External service failures (when applicable)
- Timeout scenarios (when applicable)

**Edge Cases**
- Empty inputs
- Null or undefined values
- Maximum/minimum values
- Special characters in strings

## Shared Module Testing

**Testing Utilities**
- Test shared modules independently
- Create tests in `src/functions/shared/tests/` (when needed)
- Verify utility functions work correctly in isolation
- Test edge cases and error conditions

**Integration with Functions**
- Shared modules are tested through function tests
- Verify correct integration in handler tests
- No need for extensive mocking of shared utilities

## Mocking Strategy

**Minimal Mocking**
- Avoid excessive mocking when possible
- Test real implementations when feasible
- Mock external AWS services (DynamoDB, S3, etc.) when needed
- Mock HTTP calls to external APIs

**When to Mock**
- AWS SDK calls (to avoid actual AWS resource usage)
- External API calls
- Time-dependent functions
- Random number generation (for deterministic tests)

## API Testing with Postman

**Collection Maintenance**
- Postman collection: `collection.postman.json`
- Generated/updated using Portman
- Configuration: `portman/portman-config.json`
- CLI options: `portman/portman-cli.json`

**Running API Tests**
- Command: `npm run portman`
- Tests actual API endpoints
- Validates request/response schemas
- Requires deployed API and authentication

**Authentication Testing**
- User-password auth script: `portman/get-auth-token/user-password-auth.mjs`
- Environment variables in `.env-portman`
- Obtains tokens for authenticated endpoint testing

## CI/CD Integration

**Pre-Deployment Testing**
- Run unit tests: `npm test`
- Check coverage: `npm run coverage`
- Lint code: `npm run lint`
- Lint API spec: `npm run lint-api`
- All must pass before deployment

**GitHub Actions**
- Tests run automatically on pull requests
- Deployment blocked if tests fail
- Coverage reports can be uploaded to code quality tools

## Best Practices

**Test Independence**
- Each test should be independent
- Don't rely on test execution order
- Clean up any state between tests
- Use fresh data for each test

**Test Readability**
- Write clear, descriptive test names
- Use arrange-act-assert pattern
- Keep tests focused on one thing
- Add comments for complex test scenarios

**Test Maintenance**
- Update tests when code changes
- Remove obsolete tests
- Refactor tests to reduce duplication
- Keep test code quality high

**Performance**
- Keep tests fast (unit tests should be milliseconds)
- Avoid unnecessary async operations
- Mock slow external dependencies
- Run tests in parallel when possible

## Testing Checklist for New Functions

- [ ] Create `tests/` subdirectory in function folder
- [ ] Write test file: `index.tests.mjs`
- [ ] Test successful execution with valid input
- [ ] Test error handling with invalid input
- [ ] Test edge cases and boundary conditions
- [ ] Verify response format and status codes
- [ ] Run coverage to ensure adequate coverage
- [ ] Update Postman collection for API endpoints
- [ ] Verify all tests pass: `npm test`
- [ ] Check linting: `npm run lint`
