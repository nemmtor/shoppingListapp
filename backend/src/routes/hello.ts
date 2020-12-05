import { Router } from 'express';

export const route = Router();

route.get('/', (_req, res) => {
  return res.status(200).json({ message: 'Hello world!' });
});
