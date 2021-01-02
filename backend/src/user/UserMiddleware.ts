import { length } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

import { getDataFromToken } from '../utils';
import { UserDAL } from './UserDAL';
import { validations } from '../../../shared';

const {
  MIN_PW_LENGTH,
  MAX_PW_LENGTH,
  MIN_UNAME_LENGTH,
  MAX_UNAME_LENGTH,
} = validations;

export class UserMiddleware {
  public static validateAuthBodyRequest(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Response | void {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(422).json({ message: 'Invalid request body.' });
    }

    // Need proper IFormError here!
    if (!length(username, MIN_UNAME_LENGTH, MAX_UNAME_LENGTH)) {
      return res.status(422).json({
        message: `Username must be between ${MIN_UNAME_LENGTH} and ${MAX_UNAME_LENGTH} characters long.`,
      });
    }

    // Need proper IFormError here!
    if (!length(password, MIN_PW_LENGTH, MAX_PW_LENGTH)) {
      return res.status(422).json({
        message: `Password must be between ${MIN_PW_LENGTH} and ${MAX_PW_LENGTH} characters long.`,
      });
    }

    return next();
  }

  public static async checkAuthorization(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { token } = req.body;
    const denyMessage = 'Access denied.';
    if (!token) return res.status(401).json({ message: denyMessage });
    try {
      const decodedTokenData = getDataFromToken(token as string);

      const user = await UserDAL.getOneById(decodedTokenData.userId);
      if (!user) {
        return res.status(401).json({ message: denyMessage });
      }

      res.locals.user = user;

      return next();
    } catch (_error) {
      return res.status(401).json({ message: denyMessage });
    }
  }
}
