---
inclusion: always
---

# File Structure Guidelines

## Current Project Structure

```
.
├── .github/                    # GitHub Actions workflows
├── docs/                       # Documentation and images
├── portman/                    # Portman configuration for API testing
├── src/
│   ├── functions/              # Lambda function code
│   │   ├── {function-name}/    # Individual function directory
│   │   │   ├── index.mjs       # Function handler
│   │   │   └── tests/          # Function-specific tests
│   │   │       └── index.tests.mjs
│   │   └── shared/             # Shared utilities across functions
│   │       ├── apigateway.mjs  # API Gateway response helpers
│   │       ├── lambda-powertools.mjs  # Powertools initialization
│   │       └── middleware/     # Custom middleware (if needed)
│   ├── tasks/                  # Step Functions task code (future)
│   └── workflows/              # Step Functions workflow definitions (future)
├── coverage/                   # Test coverage reports
├── tmp/                        # Temporary files for testing
├── openapi.yaml               # API specification
├── template.yaml              # SAM template
├── samconfig.yaml             # SAM deployment configuration
├── package.json               # Node.js dependencies
├── .spectral.yaml             # API linting rules
├── .c8rc                      # Coverage configuration
└── eslint.config.mjs          # ESLint configuration
```

## Naming Conventions

**Function Directories**
- Use kebab-case for function directory names (e.g., `echo`, `get-user`, `process-order`)
- Each function should be self-contained in its own directory

**File Names**
- Use `.mjs` extension for ES modules
- Handler file: `index.mjs`
- Test files: `{name}.tests.mjs`
- Shared utilities: descriptive names in kebab-case

**API Paths**
- Use kebab-case for URL paths (e.g., `/user-profile`, `/order-history`)
- Path parameters in camelCase within braces (e.g., `/{userId}`)

**Code Identifiers**
- Operation IDs: camelCase (e.g., `getUserProfile`)
- Component keys: camelCase
- Property keys: camelCase
- Query parameters: kebab-case

## Adding New Lambda Functions

When creating a new Lambda function, follow this structure:

```
src/functions/{function-name}/
├── index.mjs                   # Main handler
├── tests/
│   └── index.tests.mjs        # Unit tests
└── {additional-modules}.mjs   # Function-specific utilities (optional)
```

**Steps:**
1. Create function directory under `src/functions/`
2. Implement handler in `index.mjs` using shared utilities
3. Add corresponding tests in `tests/` subdirectory
4. Define function resource in `template.yaml`
5. Add API endpoint definition in `openapi.yaml`
6. Update x-amazon-apigateway-integration to reference the new function

## Adding Shared Utilities

Place reusable code in `src/functions/shared/`:
- API utilities: `src/functions/shared/apigateway.mjs`
- Powertools setup: `src/functions/shared/lambda-powertools.mjs`
- Custom middleware: `src/functions/shared/middleware/{middleware-name}.mjs`

## Future Structure Patterns

**Step Functions Tasks**
```
src/tasks/{task-name}/
├── index.mjs
└── tests/
    └── index.tests.mjs
```

**Step Functions Workflows**
```
src/workflows/{workflow-name}/
├── definition.asl.json         # State machine definition
└── tests/
    └── workflow.tests.mjs
```

**Additional API Resources**
- Keep related functions grouped by domain when the project grows
- Consider subdirectories under `src/functions/` for logical grouping (e.g., `src/functions/users/`, `src/functions/orders/`)

## Configuration Files Location

- Root level: Project-wide configuration (SAM, OpenAPI, package.json, linting)
- `.github/`: CI/CD workflows
- `portman/`: API testing configuration
- `.kiro/`: Kiro-specific settings and steering files

## Test and Coverage Files

- Test files: Co-located with source in `tests/` subdirectory
- Coverage reports: Generated in `coverage/` directory (gitignored)
- Temporary test files: `tmp/` directory (gitignored)

## Documentation

- Project documentation: `docs/` directory
- Images and diagrams: `docs/images/`
- API documentation: Embedded in `openapi.yaml`
- README: Root level for quick start and overview
