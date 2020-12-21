import { Router } from 'express';
import { UserController } from './UserController';
import { UserMiddleware } from './UserMiddleware';

export const userRoute = Router();

userRoute.post(
  '/register',
  UserMiddleware.validateAuthBodyRequest,
  UserController.register,
);

userRoute.post(
  '/login',
  UserMiddleware.validateAuthBodyRequest,
  UserController.login,
);

userRoute.post('/me', UserMiddleware.checkAuthorization, UserController.me);
