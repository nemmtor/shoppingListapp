import { Router } from 'express';
import yaml from 'js-yaml';
import fs from 'fs';
import swaggerUI, { JsonObject } from 'swagger-ui-express';

export const apiDocsRoute = Router();

try {
  // Load swagger docs from yml file
  const swaggerDocs = yaml.safeLoad(
    fs.readFileSync(`${__dirname}/../../swagger.yml`, 'utf-8'),
  );

  apiDocsRoute.use('/', swaggerUI.serve);
  apiDocsRoute.get('/', swaggerUI.setup(swaggerDocs as JsonObject));
} catch (_err) {
  apiDocsRoute.get('/', (_req, res) => {
    res
      .status(400)
      .send('There is a problem with api docs. Please contact administrator.');
  });
}
