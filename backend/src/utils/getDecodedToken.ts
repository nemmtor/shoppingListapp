import jwt from 'jsonwebtoken';

export interface IToken {
  username: string;
  userId: number;
}

export const getDecodedToken = (token: string): IToken => {
  return <IToken>jwt.verify(token, process.env.JWT_SECRET as string);
};
