import { initializePowertools, logger } from '../shared/lambda-powertools.mjs';
import { getResponse } from '../shared/apigateway.mjs';
import { calculate } from './calculator.mjs';

export const handler = initializePowertools(async (event) => {
  try {
    const input = JSON.parse(event.body);
    const { operation, numbers } = input;

    const result = calculate(operation, numbers);

    return getResponse(200, {
      operation,
      numbers,
      result
    });
  } catch (err) {
    // Check if this is a validation error (from our calculator logic)
    if (err.message && (
      err.message.includes('Invalid operation type') ||
      err.message.includes('Division operation') ||
      err.message.includes('Division by zero')
    )) {
      return getResponse(400, { message: err.message });
    }

    // Unhandled/unexpected errors
    logger.error(err, err.stack);
    return getResponse(500, { message: 'Something went wrong!' });
  }
});
