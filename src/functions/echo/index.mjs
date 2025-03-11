import { initializePowertools, logger } from '../shared/lambda-powertools.mjs';
import { getResponse } from '../shared/apigateway.mjs';

export const handler = initializePowertools(async (event) => {
  try {
    console.info('Log 1');
    console.warn('Log 2');
    console.error('Log 3');
    console.info('Log 4');
    const input = JSON.parse(event.body);

    return getResponse(200, input);
  } catch (err) {
    logger.error(err, err.stack);
    return getResponse(500, { message: 'Something went wrong!' })
  }
});
