import { ConnectionOptions, getConnectionOptions } from 'typeorm';

import { config } from '../config';

const { IS_PROD } = config;

export const createConnectionOptions = async (): Promise<ConnectionOptions> => {
  const connectionOptions = await getConnectionOptions();
  const extraOptions = {
    // maybe this should be 'db'
    host: IS_PROD ? 'shopping-db' : 'localhost',
    synchronize: !IS_PROD,
  };
  Object.assign(connectionOptions, extraOptions);
  return connectionOptions;
};
