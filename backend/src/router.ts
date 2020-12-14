import { Router } from 'express';

import { userRoute } from './users';

export const router = Router();
router.use('/user', userRoute);
