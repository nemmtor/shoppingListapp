import { Router } from 'express';

import { apiDocsRoute } from './apiDocs';
import { userRoute } from './user';

export const router = Router();
router.use('/api-docs', apiDocsRoute);
router.use('/user', userRoute);
