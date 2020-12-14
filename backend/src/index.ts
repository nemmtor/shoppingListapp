import 'reflect-metadata';
import { config } from 'dotenv-safe';
import { createConnection } from 'typeorm';

import { app } from './app';
import { createConnectionOptions } from './utils/createConnectionOptions';

config();

const server = async (): Promise<void> => {
  const connectionOptions = await createConnectionOptions();
  await createConnection(connectionOptions);

  app.listen(4000, () => {
    console.log('Server listening at port 4000.');
  });
};

server();
