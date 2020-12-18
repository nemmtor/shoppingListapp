import { NextFunction, Request, Response } from 'express';
import { UserDAL } from '../user/UserDAL';
import { getDecodedToken } from '../utils';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  const denyMessage = 'Access denied.';
  const token = req.headers['x-access-token'] || req.headers.authorization;
  if (!token) return res.status(401).json({ message: denyMessage });
  try {
    const decodedToken = getDecodedToken(token as string);

    const user = await UserDAL.getOneById(decodedToken.userId);
    if (!user) throw new Error();

    res.locals.user = user;

    return next();
  } catch (_error) {
    return res.status(401).json({ message: denyMessage });
  }
};
