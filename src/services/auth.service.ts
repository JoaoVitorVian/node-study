import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { UserService } from '../services/user.service';

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';
const EXPIRES_IN = '1h';

export class AuthService {
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  static async comparePasswords(inputPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(inputPassword, hashedPassword);
  }

  static generateToken(userId: number): string {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: EXPIRES_IN });
  }

  static verifyToken(token: string): { userId: number } {
    return jwt.verify(token, JWT_SECRET) as { userId: number };
  }
}