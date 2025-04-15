import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import { NotFoundError } from '../core/errors/errors-padronized';
import { authenticate } from '../core/middlewares/auth';

const router = Router();

router.use((req, res, next) => {
  console.log(`Users API request: ${req.method} ${req.path}`);
  next();
});

router.get('/getAllUsers', authenticate, userController.getAllUsers);
router.get('/:id', authenticate, userController.getUserById);
router.put('/:id/updateUsers', authenticate, userController.updateUser);
router.delete('/:id', authenticate, userController.deleteUser);

router.use((req, res, next) => {
  next(new NotFoundError('User route'));
});

export default router;
