import { length } from 'class-validator';

import { config } from '../config';

interface IUserValidationError {
  message: string;
  statusCode: number;
}

type TUserValidationReturn = IUserValidationError | null;

const { MIN_PW_LENGTH, MAX_PW_LENGTH } = config;

export class UserValidation {
  public static register(
    username: string,
    password: string,
  ): TUserValidationReturn {
    if (!username || !password) {
      return { message: 'Invalid request body', statusCode: 422 };
    }

    if (!length(password, MIN_PW_LENGTH, MAX_PW_LENGTH)) {
      return {
        statusCode: 422,
        message: `Password must be between ${MIN_PW_LENGTH} and ${MAX_PW_LENGTH} characters long.`,
      };
    }
    return null;
  }
}
