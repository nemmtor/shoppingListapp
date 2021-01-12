import { Request, Response } from 'express';
import argon2 from 'argon2';

import { validateOrReject } from 'class-validator';

import { parseSqlError, createAuthToken } from '../utils';
import { IAuthRes } from './interfaces';
import { User } from './User.entity';

export class UserService {
  private static failedLoginCode = 401;

  private static failedLoginMessage = 'Invalid username or password.';

  public static async register(req: Request, res: IAuthRes): Promise<Response> {
    // Dont need to check body - it was checked in middleware
    const { username, password } = req.body;

    try {
      const hashedPassword = await argon2.hash(password);
      const user = User.create({ username, password: hashedPassword });

      await validateOrReject(user);
      await user.save();
      const token = createAuthToken(user);

      return res
        .status(200)
        .json({ token, username: user.username, userId: user.id });
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

    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(UserService.failedLoginCode).json({
        errors: [
          { field: 'username', error: UserService.failedLoginMessage },
          { field: 'password', error: UserService.failedLoginMessage },
        ],
      });
    }

    const validPassword = await argon2.verify(user.password, password);
    if (!validPassword) {
      return res.status(UserService.failedLoginCode).json({
        errors: [
          { field: 'username', error: UserService.failedLoginMessage },
          { field: 'password', error: UserService.failedLoginMessage },
        ],
      });
    }

    const token = createAuthToken(user);

    // TODO: Make sure this is safe
    // res.cookie('token', token, { httpOnly: true });

    return res
      .status(200)
      .json({ token, username: user.username, userId: user.id });
  }

  public static me(_req: Request, res: Response): Response {
    // locals come from middleware
    const { username } = res.locals.user;
    return res.status(200).json({ username });
  }
}
