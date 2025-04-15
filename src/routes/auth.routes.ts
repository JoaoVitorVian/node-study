import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { UserService } from '../services/user.service';
import { UserRepository } from '../repository/user.repository';

const router = Router();
const userRepository = new UserRepository();
const userService = new UserService();
const authController = new AuthController(userService);

router.post('/register', (req, res) => {
  authController.register(req, res).catch(err => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  });
});

router.post('/login', (req, res) => {
  authController.login(req, res).catch(err => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  });
});

export default router;