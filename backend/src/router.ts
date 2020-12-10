import { Router } from 'express';

import { helloRoute, userRoute } from './routes';

export const router = Router();
router.use('/hello', helloRoute);
router.use('/user', userRoute);
