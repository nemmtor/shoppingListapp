import { Request, Response } from 'express';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

import { parseSqlError } from '../utils/parseSqlError';
import { UserValidation } from './UserValidation';
import { UserDAL } from './UserDAL';
import { User } from './User.entity';

export class UserController {
  private static failedLoginCode = 401;

  private static failedLoginMessage = 'Invalid username or password.';

  public static async register(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;

    const registerError = UserValidation.register(username, password);
    if (registerError) {
      return res
        .status(registerError.statusCode)
        .json({ message: registerError.message });
    }

    try {
      await UserDAL.create(username, password);
      return res.status(200).json();
    } catch (error) {
      // If there is error.code than it means its SQL error
      // parseSqlError will return proper error message
      // Otherwise handle errors normally
      const errorOutput = parseSqlError(error.code) || error.message || error;
      return res.status(400).json({ error: errorOutput });
    }
  }

  public static async login(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res
        .status(UserController.failedLoginCode)
        .json({ message: UserController.failedLoginMessage });
    }

    const isAuthorized = await argon2.verify(user.password, password);
    if (!isAuthorized) {
      return res
        .status(401)
        .json({ message: UserController.failedLoginMessage });
    }

    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET as string,
    );
    return res.status(200).json({ token });
  }
}
