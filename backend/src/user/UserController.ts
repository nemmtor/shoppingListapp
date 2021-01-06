import { Request, Response } from 'express';
import argon2 from 'argon2';

import { parseSqlError, createAuthToken } from '../utils';
import { UserDAL } from './UserDAL';

import { IAuthRes } from './interfaces';

export class UserController {
  private static failedLoginCode = 401;

  private static failedLoginMessage = 'Invalid username or password.';

  public static async register(req: Request, res: IAuthRes): Promise<Response> {
    // Dont need to check body - it was checked in middleware
    const { username, password } = req.body;

    try {
      const user = await UserDAL.createOrFail(username, password);

      const token = createAuthToken(user);

      return res.status(200).json({ token });
    } catch (error) {
      // TODO: username already taken should return 409
      // TODO: Right now error here is hardcoded - need to fix that
      const errorOutput = parseSqlError(error.code) || error.message || error;
      return res.status(400).json({
        errors: [
          {
            field: 'username',
            error: errorOutput,
          },
        ],
      });
    }
  }

  public static async login(req: Request, res: IAuthRes): Promise<Response> {
    // Dont need to check body - it was checked in middleware
    const { username, password } = req.body;

    const user = await UserDAL.getOneByUsername(username);
    if (!user) {
      return res.status(UserController.failedLoginCode).json({
        errors: [
          { field: 'username', error: UserController.failedLoginMessage },
          { field: 'password', error: UserController.failedLoginMessage },
        ],
      });
    }

    const validPassword = await argon2.verify(user.password, password);
    if (!validPassword) {
      return res.status(UserController.failedLoginCode).json({
        errors: [
          { field: 'username', error: UserController.failedLoginMessage },
          { field: 'password', error: UserController.failedLoginMessage },
        ],
      });
    }

    const token = createAuthToken(user);

    // TODO: Make sure this is safe
    res.cookie('token', token, { httpOnly: true });

    return res.status(200).json({ token });
  }

  public static me(_req: Request, res: Response): Response {
    // locals come from middleware
    const { username } = res.locals.user;
    return res.status(200).json({ username });
  }
}
