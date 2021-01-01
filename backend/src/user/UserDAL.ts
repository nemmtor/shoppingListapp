import argon2 from 'argon2';
import { validateOrReject } from 'class-validator';
import { User } from './User.entity';

export class UserDAL {
  public static async create(
    username: string,
    password: string,
  ): Promise<void> {
    const hashedPassword = await argon2.hash(password);
    const user = User.create({ username, password: hashedPassword });

    await validateOrReject(user);
    await user.save();
  }

  public static async getOneById(id: number): Promise<User | undefined> {
    return User.findOne(id);
  }

  public static async getOneByUsername(
    username: string,
  ): Promise<User | undefined> {
    return User.findOne({ where: { username } });
  }
}
