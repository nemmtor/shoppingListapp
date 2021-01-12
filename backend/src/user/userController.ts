import { NextFunction, Request, Response, Router } from 'express';

import { UserService } from './UserService';
import { UserMiddleware } from './UserMiddleware';
// import { authMiddleware } from '../authMiddleware';
import { authMiddleware } from '../authMiddleware';

export const userController = Router();

userController.post(
  '/register',
  UserMiddleware.validateAuthBodyRequest,
  UserService.register,
);

userController.post('/login', UserService.login);

userController.post(
  '/me',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware(req, res, next);
  },
  UserService.me,
);
