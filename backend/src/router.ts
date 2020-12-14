import { Router } from 'express';

import { userRoute } from './user';

export const router = Router();
router.use('/user', userRoute);
