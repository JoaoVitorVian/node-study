import winston from 'winston';

const logger = winston.createLogger({
  level: 'error',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log' }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

export const logError = (errorDetails: {
  message: string;
  stack?: string;
  statusCode: number;
  path: string;
  method: string;
}) => {
  logger.error({
    ...errorDetails,
    timestamp: new Date().toISOString()
  });
};