import { Router } from 'express';
import { UserController } from './UserController';
import { authMiddleware } from '../middlewares';

export const userRoute = Router();

userRoute.post('/register', UserController.register);
userRoute.post('/login', UserController.login);
userRoute.post('/me', authMiddleware, UserController.me);
