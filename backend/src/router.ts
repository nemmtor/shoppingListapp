import { Router } from 'express';
import yaml from 'js-yaml';
import fs from 'fs';
import swaggerUI, { JsonObject } from 'swagger-ui-express';

import { userRoute } from './user';
import { apiDocsRoute } from './apiDocs';

export const router = Router();
router.use('/user', userRoute);
router.use('/api-docs', apiDocsRoute);

try {
  const swaggerDoc = yaml.safeLoad(
    fs.readFileSync(`${__dirname}/../swagger.yml`, 'utf-8'),
  );

  router.use('/api-docs', swaggerUI.serve);
  router.get('/api-docs', swaggerUI.setup(swaggerDoc as JsonObject));
} catch (_err) {
  console.log(`Warning: couldn't load swagger docs!`);
}
