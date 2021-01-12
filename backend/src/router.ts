import { Router } from 'express';

import { apiDocsRoute } from './apiDocs';
import { listController } from './list';
import { userController } from './user';

export const router = Router();
router.use('/api-docs', apiDocsRoute);
router.use('/user', userController);
router.use('/list', listController);
