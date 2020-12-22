import 'reflect-metadata';
import { config } from 'dotenv-safe';
import { createConnection } from 'typeorm';
import killPort from 'kill-port';
import { createConnectionOptions } from './utils';
import { app } from './app';

config();

const server = async (): Promise<void> => {
  const connectionOptions = await createConnectionOptions();
  await createConnection(connectionOptions);

  app.listen(4000, () => {
    console.log('Server listening at port 4000.');
  });
};

server();

const exit = (): void => {
  console.log('Stopping the server...');
  killPort(4000);
  process.exit();
};

process.on('SIGINT', exit);

process.on('exit', exit);
