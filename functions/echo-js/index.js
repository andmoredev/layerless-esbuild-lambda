const { initializePowertools, logger } = require('../shared/lambda-powertools.js');
const { getResponse } = require('../shared/apigateway.js');

exports.handler = initializePowertools(async (event, context) => {
  try {
    const input = JSON.parse(event.body);

    return getResponse(200, input);
  } catch (err) {
    logger.error(err, err.stack);
    return getResponse(500, { message: 'Something went wrong!' });
  }
});
