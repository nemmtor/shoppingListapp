import { ConnectionOptions, getConnectionOptions } from 'typeorm';

import { config } from '../config';

const { IS_PROD } = config;
export const createConnectionOptions = async (): Promise<ConnectionOptions> => {
  const connectionOptions = await getConnectionOptions();
  const extraOptions = {
    host: IS_PROD ? process.env.TYPEORM_HOST : 'dev.shopping-db',
    synchronize: !IS_PROD,
  };
  Object.assign(connectionOptions, extraOptions);
  return connectionOptions;
};
