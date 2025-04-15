import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../../services/auth.service';

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    res.status(401).json({ error: 'Authorization header missing' });
    return;
  }

  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = AuthService.verifyToken(token);
    // Solução alternativa temporária no auth.ts
(req as any).userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};