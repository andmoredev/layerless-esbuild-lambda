import { initializePowertools, logger } from '../shared/lambda-powertools.mjs';
import { getResponse } from '../shared/apigateway.mjs';

export const handler = initializePowertools(async (event) => {
  try {
    console.debug('Log 1');
    console.debug('Log 2');
    console.debug('Log 3');
    console.debug('Log 4');
    const input = JSON.parse(event.body);

    return getResponse(200, input);
  } catch (err) {
    logger.error(err, err.stack);
    return getResponse(500, { message: 'Something went wrong!' })
  }
});
