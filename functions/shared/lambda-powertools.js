const { Logger, injectLambdaContext } = require('@aws-lambda-powertools/logger');
const { Metrics, logMetrics } = require('@aws-lambda-powertools/metrics');
const { Tracer, captureLambdaHandler } = require('@aws-lambda-powertools/tracer');
const middy = require('@middy/core');

exports.logger = new Logger({
  persistentLogAttributes: {
    aws_account_id: process.env.AWS_ACCOUNT_ID || 'N/A',
    aws_region: process.env.AWS_REGION || 'N/A'
  }
});

exports.metrics = new Metrics({
  defaultDimensions: {
    aws_account_id: process.env.AWS_ACCOUNT_ID || 'N/A',
    aws_region: process.env.AWS_REGION || 'N/A'
  }
});

exports.tracer = new Tracer();

const loggerOptions = {
  clearState: true,
  logEvent: true
};

const metricsOptions = {
  captureColdStartMetric: true
};

exports.initializePowertools = (handler) => {
  return middy(handler)
      .use(captureLambdaHandler(exports.tracer))
      .use(logMetrics(exports.metrics, metricsOptions))
      .use(injectLambdaContext(exports.logger, loggerOptions));
};