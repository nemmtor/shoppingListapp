import { ConnectionOptions, getConnectionOptions } from 'typeorm';
import { IS_PROD } from './constants';

export const createConnectionOptions = async (): Promise<ConnectionOptions> => {
  const connectionOptions = await getConnectionOptions();
  const extraOptions = {
    host: IS_PROD ? '' : 'localhost',
    port: IS_PROD ? '' : 5432,
    synchronize: !IS_PROD,
  };
  Object.assign(connectionOptions, extraOptions);
  return connectionOptions;
};
