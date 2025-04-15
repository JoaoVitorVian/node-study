import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';
import { logError } from './logger';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    logError({
      message: err.message,
      stack: err.stack,
      statusCode: err.statusCode,
      path: req.path,
      method: req.method
    });

    return res.status(err.statusCode).json({
      success: false,
      errors: err.serializeErrors(),
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
  }

  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({
      success: false,
      errors: [{ message: 'Invalid JSON payload' }]
    });
  }

  logError({
    message: err.message || 'Unknown error',
    stack: err.stack,
    statusCode: 500,
    path: req.path,
    method: req.method
  });

  const errorResponse = {
    success: false,
    errors: [{ message: 'Something went wrong' }],
    ...(process.env.NODE_ENV === 'development' && { 
      stack: err.stack,
      originalError: {
        name: err.name,
        message: err.message
      }
    })
  };

  res.status(500).json(errorResponse);
};