import { Router } from 'express';
import yaml from 'js-yaml';
import fs from 'fs';
import swaggerUI, { JsonObject } from 'swagger-ui-express';

export const apiDocsRoute = Router();

try {
  const swaggerDoc = yaml.safeLoad(
    fs.readFileSync(`${__dirname}/../../swagger.yml`, 'utf-8'),
  );

  apiDocsRoute.use('/api-docs', swaggerUI.serve);
  apiDocsRoute.get('/api-docs', swaggerUI.setup(swaggerDoc as JsonObject));
} catch (_err) {
  console.log(`Warning: couldn't load swagger docs!`);
}
