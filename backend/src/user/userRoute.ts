import { Router } from 'express';
import { UserController } from './UserController';

export const userRoute = Router();

userRoute.post('/register', UserController.register);
userRoute.post('/login', UserController.login);
