// import { Request, Response, NextFunction } from 'express';
// import { logRequest } from '../utils/logger';

// export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
//   const start = Date.now();
  
//   res.on('finish', () => {
//     const duration = Date.now() - start;
//     logRequest({
//       method: req.method,
//       path: req.path,
//       status: res.statusCode,
//       duration,
//       ip: req.ip,
//       userAgent: req.get('user-agent') || ''
//     });
//   });

//   next();
// };