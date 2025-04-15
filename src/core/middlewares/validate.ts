// import { Request, Response, NextFunction } from 'express';
// import Joi from 'joi';
// import { ValidationError } from '../errors/custom-error';

// export const validate = (schema: Joi.Schema) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     const { error } = schema.validate(req.body, { abortEarly: false });
    
//     if (error) {
//       const errors = error.details.map(detail => ({
//         message: detail.message,
//         field: detail.context?.key
//       }));
//       return next(new ValidationError(errors));
//     }

//     next();
//   };
// };