import { Router, Request, Response, NextFunction } from 'express';
import { authMiddleware } from '../authMiddleware';
import { ListService } from './ListService';

export const listController = Router();

listController.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware(req, res, next);
  },
  ListService.add,
);

listController.get(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware(req, res, next);
  },
  ListService.getMyListsTitles,
);

listController.get(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware(req, res, next);
  },
  ListService.getMyList,
);
