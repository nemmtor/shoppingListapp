import { Request, Response } from 'express';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

// import { parseSqlError } from '../utils';
import { UserDAL } from './UserDAL';

import { IAuthRes } from './interfaces';

export class UserController {
  private static failedLoginCode = 401;

  private static failedLoginMessage = 'Invalid username or password.';

  public static async register(req: Request, res: IAuthRes): Promise<Response> {
    const { username, password } = req.body;

    try {
      await UserDAL.create(username, password);
      return res.status(200).json();
    } catch (error) {
      // TODO: username already taken should return 409
      // const errorOutput = parseSqlError(error.code) || error.message || error;
      return res.status(400).json({
        errors: [
          {
            field: 'username',
            error: 'TODO here, need to check if it is from sql',
          },
        ],
      });
    }
  }

  public static async login(req: Request, res: IAuthRes): Promise<Response> {
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

    const token = jwt.sign(
      { username: user.username, userId: user.id },
      process.env.JWT_SECRET as string,
    );

    res.cookie('token', token, { httpOnly: true });

    return res.status(200).json({ token });
  }

  public static me(_req: Request, res: Response): Response {
    const { username } = res.locals.user;
    return res.status(200).json({ username });
  }
}
