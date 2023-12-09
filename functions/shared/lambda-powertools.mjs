import { Logger, injectLambdaContext } from '@aws-lambda-powertools/logger';
import { Metrics, logMetrics } from '@aws-lambda-powertools/metrics';
import { Tracer, captureLambdaHandler } from '@aws-lambda-powertools/tracer';
import middy from '@middy/core';

export const logger = new Logger({
  persistentLogAttributes: {
    aws_account_id: process.env.AWS_ACCOUNT_ID || 'N/A',
    aws_region: process.env.AWS_REGION || 'N/A'
  }
});

export const metrics = new Metrics({
  defaultDimensions: {
    aws_account_id: process.env.AWS_ACCOUNT_ID || 'N/A',
    aws_region: process.env.AWS_REGION || 'N/A'
  }
});

export const tracer = new Tracer();

const loggerOptions = {
  clearState: true,
  logEvent: true
};

const metricsOptions = {
  captureColdStartMetric: true
};

export const initializePowertools = (handler) => {
  return middy(handler)
      .use(captureLambdaHandler(tracer))
      .use(logMetrics(metrics, metricsOptions))
      .use(injectLambdaContext(logger, loggerOptions));
};