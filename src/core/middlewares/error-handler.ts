// import { Request, Response, NextFunction } from 'express';
// import { CustomError } from '../errors/custom-error';
// import { logError } from '../utils/logger';

// export const errorHandler = (
//   err: Error,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   if (err instanceof CustomError) {
//     logError({
//       message: err.message,
//       stack: err.stack,
//       statusCode: err.statusCode,
//       path: req.path,
//       method: req.method
//     });
    
//     return res.status(err.statusCode).json({
//       success: false,
//       errors: err.serializeErrors(),
//       stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
//     });
//   }

//   // Erros não tratados
//   logError({
//     message: err.message,
//     stack: err.stack,
//     statusCode: 500,
//     path: req.path,
//     method: req.method
//   });

//   res.status(500).json({
//     success: false,
//     errors: [{ message: 'Something went wrong' }],
//     stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
//   });
// };