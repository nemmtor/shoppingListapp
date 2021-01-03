import jwt from 'jsonwebtoken';
import { User } from '../user/User.entity';

export const createAuthToken = (user: User): string => {
  return jwt.sign(
    {
      username: user.username,
      userId: user.id,
    },
    process.env.JWT_SECRET as string,
  );
};
