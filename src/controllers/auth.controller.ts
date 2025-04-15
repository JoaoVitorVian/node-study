import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../entities/user';

export class AuthController {
  constructor(private userService: UserService) {}

  async register(req: Request, res: Response) {
    const { name, email, password } = req.body as User;
    
    try {
      const hashedPassword = await AuthService.hashPassword(password);
      const user = await this.userService.createUser({ 
        name, 
        email, 
        password: hashedPassword 
      });
      
      res.status(201).json({ 
        id: user.id, 
        name: user.name,
        email: user.email 
      });
    } catch (error) {
      res.status(400).json({ error: 'Email already exists' });
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await this.userService.findByEmail(email);

    if (!user || !(await AuthService.comparePasswords(password, user.password))) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = AuthService.generateToken(user.id);
    res.json({ token });
  }
}