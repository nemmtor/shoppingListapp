import { Router } from 'express';

import { helloRoute } from './routes';

export const router = Router();
router.use('/hello', helloRoute);
