import { NextFunction, Request, Response } from 'express';
import { IFormError } from '../../../shared';
import { checkConstrains } from '../utils';
import { IMiddlewareErrorRes } from './interfaces';

export class UserMiddleware {
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
        .json({ errors: [{ field: 'form', error: 'Invalid body data' }] });
    }

    const constrainsErrors = checkConstrains({
      username,
      password,
    }).filter((error) => !!error);

    // Invalid body error - wrong length of input
    if (constrainsErrors.length > 0) {
      return res.status(422).json({ errors: constrainsErrors as IFormError[] });
    }

    // All good - proceed to next one
    return next();
  }
}
