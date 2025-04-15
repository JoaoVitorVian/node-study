import { NextFunction, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { NotFoundError, DatabaseError } from '../core/errors/errors-padronized';
import { handleError } from '../core/errors/handle-error';

const userService = new UserService();

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getAllUsers();
    
    users.length > 0 ? res.json({success: true, data: users}): next(new NotFoundError('Users'));

  } catch (error) {
    handleError(error, next);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const user = await userService.getUserById(id);
  
    user ? res.json({ success:true, data: user}) : next(new NotFoundError('User'));

  } catch (error) {
    handleError(error, next);
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    
    if (!name || !email) {
      res.status(400).json({ message: 'Name and email are required' });
      return;
    }

    const newUser = await userService.createUser({ name, email });
    res.status(201).json(newUser);
  } catch (error: any) {
    if (error.code === '23505') {
      res.status(400).json({ message: 'Email already exists' });
    } else {
      res.status(500).json({ message: 'Error creating user' });
    }
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const updated = await userService.updateUser(id, req.body);
    
    if (!updated) throw new Error('User not found'); 
    
    res.json(updated);
  } catch (error) {
    handleError(error, next);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const deleted = await userService.deleteUser(id);
    
    if (!deleted) throw new Error('User not found'); 
    
    res.status(204).send();
  } catch (error) {
    handleError(error, next);
  }
};