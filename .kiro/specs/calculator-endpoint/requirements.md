# Requirements Document

## Introduction

This feature adds a calculator endpoint to the serverless API that performs mathematical operations on arrays of numbers. The endpoint accepts an array of numbers and an operation type, then returns the calculated result. The feature supports basic arithmetic operations (addition, subtraction, multiplication, division) with specific validation rules for division operations.

## Glossary

- **Calculator Service**: The Lambda function that processes mathematical operations on number arrays
- **Operation Type**: The mathematical operation to perform (addition, subtraction, multiplication, or division)
- **Number Array**: An array of numeric values provided as input for calculation
- **API Gateway**: AWS service that receives HTTP requests and routes them to the Calculator Service

## Requirements

### Requirement 1

**User Story:** As an API consumer, I want to perform addition on multiple numbers, so that I can calculate the sum of a list of values

#### Acceptance Criteria

1. WHEN the Calculator Service receives a request with operation type "addition" and a Number Array, THE Calculator Service SHALL return a response with status code 200 and the sum of all numbers in the array
2. WHEN the Calculator Service receives a request with operation type "addition" and an empty Number Array, THE Calculator Service SHALL return a response with status code 200 and a result of 0
3. WHEN the Calculator Service receives a request with operation type "addition" and a Number Array containing negative numbers, THE Calculator Service SHALL return a response with status code 200 and the correct sum including negative values

### Requirement 2

**User Story:** As an API consumer, I want to perform subtraction on multiple numbers, so that I can calculate the difference by subtracting subsequent values from the first value

#### Acceptance Criteria

1. WHEN the Calculator Service receives a request with operation type "subtraction" and a Number Array, THE Calculator Service SHALL return a response with status code 200 and the result of subtracting all subsequent numbers from the first number in sequential order
2. WHEN the Calculator Service receives a request with operation type "subtraction" and a Number Array with one element, THE Calculator Service SHALL return a response with status code 200 and the single number as the result
3. WHEN the Calculator Service receives a request with operation type "subtraction" and an empty Number Array, THE Calculator Service SHALL return a response with status code 200 and a result of 0

### Requirement 3

**User Story:** As an API consumer, I want to perform multiplication on multiple numbers, so that I can calculate the product of a list of values

#### Acceptance Criteria

1. WHEN the Calculator Service receives a request with operation type "multiplication" and a Number Array, THE Calculator Service SHALL return a response with status code 200 and the product of all numbers in the array
2. WHEN the Calculator Service receives a request with operation type "multiplication" and a Number Array containing zero, THE Calculator Service SHALL return a response with status code 200 and a result of 0
3. WHEN the Calculator Service receives a request with operation type "multiplication" and an empty Number Array, THE Calculator Service SHALL return a response with status code 200 and a result of 1

### Requirement 4

**User Story:** As an API consumer, I want to perform division on exactly two numbers, so that I can calculate the quotient of dividing the first number by the second

#### Acceptance Criteria

1. WHEN the Calculator Service receives a request with operation type "division" and a Number Array containing exactly two numbers, THE Calculator Service SHALL return a response with status code 200 and the result of dividing the first number by the second number
2. IF the Calculator Service receives a request with operation type "division" and a Number Array containing more than two numbers, THEN THE Calculator Service SHALL return a response with status code 400 and an error message stating "Division operation supports exactly two numbers only"
3. IF the Calculator Service receives a request with operation type "division" and a Number Array containing fewer than two numbers, THEN THE Calculator Service SHALL return a response with status code 400 and an error message stating "Division operation requires exactly two numbers"
4. IF the Calculator Service receives a request with operation type "division" and the second number in the Number Array is zero, THEN THE Calculator Service SHALL return a response with status code 400 and an error message stating "Division by zero is not allowed"

### Requirement 5

**User Story:** As an API consumer, I want to receive clear error messages for invalid requests, so that I can correct my input and successfully use the calculator endpoint

#### Acceptance Criteria

1. IF the Calculator Service receives a request with an invalid Operation Type, THEN THE Calculator Service SHALL return a response with status code 400 and an error message stating "Invalid operation type. Supported operations are: addition, subtraction, multiplication, division"
2. IF the Calculator Service receives a request with a missing Operation Type, THEN THE API Gateway SHALL return a response with status code 400 and an error message indicating the required field is missing
3. IF the Calculator Service receives a request with a missing Number Array, THEN THE API Gateway SHALL return a response with status code 400 and an error message indicating the required field is missing
4. IF the Calculator Service receives a request with a Number Array containing non-numeric values, THEN THE API Gateway SHALL return a response with status code 400 and an error message indicating invalid data type

### Requirement 6

**User Story:** As an API consumer, I want the calculator endpoint to follow the same authentication and response patterns as other API endpoints, so that I have a consistent experience across the API

#### Acceptance Criteria

1. THE Calculator Service SHALL require authentication using the Cognito authorizer configured for the API
2. THE Calculator Service SHALL return responses in JSON format with consistent structure matching other API endpoints
3. THE Calculator Service SHALL include appropriate CORS headers in all responses
4. THE Calculator Service SHALL log all requests and errors using Lambda Powertools for observability
