import { Request, Response } from 'express';
import { Product } from '../product';
import { List } from './List.entity';

export class ListService {
  public static async add(req: Request, res: Response): Promise<Response> {
    const { title, token, ...products } = req.body;
    const { user } = res.locals;

    const productsToSave: Product[] = [];
    const productNames = Object.values(products) as string[];
    try {
      productNames.forEach((productName: string) => {
        productsToSave.push(Product.create({ name: productName }));
      });
      const list = List.create({ title, user, products: [...productsToSave] });
      await list.save();
      return res.status(200).json();
    } catch (e) {
      console.log(e);
      return res.status(400).json({ error: 'something went wrong' });
    }
  }
}