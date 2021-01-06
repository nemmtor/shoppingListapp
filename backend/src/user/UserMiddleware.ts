import { NextFunction, Request, Response } from 'express';

import { getDataFromToken, getLengthErrors } from '../utils';
import { UserDAL } from './UserDAL';
import { IMiddlewareErrorRes } from './interfaces';
import { IFormError } from '../../../shared';

export class UserMiddleware {
  private static denyMessage = 'Access denied';

  // Middleware used before login and register controllers
  public static validateAuthBodyRequest(
    req: Request,
    res: IMiddlewareErrorRes,
    next: NextFunction,
  ): Response | void {
    const { username, password } = req.body;

    // Invalid body error - something is missing
    if (!username || !password) {
      return res
        .status(422)
        .json({ errors: [{ field: 'form', error: 'Invalid body datata' }] });
    }

    const lengthErrors = [username, password]
      .map((field) => getLengthErrors(field))
      // remove nulls from getLengthErrors()
      .filter((field) => !!field);

    // Invalid body error - wrong length of input
    if (lengthErrors.length > 0) {
      return res.status(422).json({ errors: lengthErrors as IFormError[] });
    }

    // All good - proceed to next one
    return next();
  }

  // Middleware used before accessing protected api routes
  public static async checkAuthorization(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { token } = req.body;

    if (!token)
      return res.status(401).json({ message: UserMiddleware.denyMessage });

    const { userId: userIdFromToken } = getDataFromToken(token as string);

    if (!userIdFromToken)
      return res.status(401).json({ message: UserMiddleware.denyMessage });

    const user = await UserDAL.getOneById(userIdFromToken);
    if (!user)
      return res.status(401).json({ message: UserMiddleware.denyMessage });

    // save user for next function
    res.locals.user = user;
    return next();
  }
}
