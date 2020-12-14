import { Router } from 'express';
import { length, validateOrReject } from 'class-validator';
import argon2 from 'argon2';

import { User } from './User.entity';
import { parseSqlError } from '../utils/parseSqlError';

export const userRoute = Router();

userRoute.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      error: 'invalid data',
    });
  }

  try {
    if (!length(password, 6, 20))
      throw new Error('password must be between 6 and 20 characters ');

    const hashedPassword = await argon2.hash(password);
    const user = User.create({ username, password: hashedPassword });

    await validateOrReject(user);

    await user.save();
    return res.status(200).json();
  } catch (error) {
    const classValidatorError = error[0]?.constraints;
    const classValidatorErrorValue = classValidatorError
      ? Object.values(classValidatorError)[0]
      : null;

    // error output is handled different, based on where it comes from
    const errorOutput =
      classValidatorErrorValue ||
      parseSqlError(error.code) ||
      error.message ||
      error;

    return res.status(400).json({ error: errorOutput });
  }
});
