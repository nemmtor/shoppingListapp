import 'reflect-metadata';
import { config as loadDotEnv } from 'dotenv-safe';
import { createConnection } from 'typeorm';

import { app } from './app';
import { createDbConnectionOptions } from './utils';

const start = async (): Promise<void> => {
  // TODO: Wrap in try/catch, if catch than throw error (500 + restart)
  const dbConnectionOptions = await createDbConnectionOptions();
  await createConnection(dbConnectionOptions);

  app.listen(4000, () => {
    console.log('Server listening at port 4000.');
  });
};

loadDotEnv();
start();
