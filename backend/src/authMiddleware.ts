import { NextFunction, Request, Response } from 'express';
import { User } from './user';
import { getDataFromToken } from './utils';

const denyMessage = 'Acces denied';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  const { authorization: bearer } = req.headers;
  if (!bearer) return res.status(401).json({ message: denyMessage });

  const token = bearer.split(' ')[1];

  const { userId: userIdFromToken } = getDataFromToken(token as string);
  if (!userIdFromToken) return res.status(401).json({ message: denyMessage });

  const user = await User.findOne(userIdFromToken);
  if (!user) return res.status(401).json({ message: denyMessage });

  res.locals.user = user;
  return next();
};
