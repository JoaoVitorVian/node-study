import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import { NotFoundError } from '../core/errors/errors-padronized';

const router = Router();

router.use((req, res, next) => {
  console.log(`Users API request: ${req.method} ${req.path}`);
  next();
});

router.get('/getAllUsers', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/createUser', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

router.use((req, res, next) => {
  next(new NotFoundError('User route'));
});

export default router;
