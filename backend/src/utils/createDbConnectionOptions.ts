import { ConnectionOptions, getConnectionOptions } from 'typeorm';

import { config } from '../config';

const { IS_PROD } = config;

export const createDbConnectionOptions = async (): Promise<ConnectionOptions> => {
  // get options from .env
  const connectionOptions = await getConnectionOptions();

  const extraOptions = {
    synchronize: !IS_PROD,
    dropSchema: !IS_PROD,
  };

  // return merged options
  return { ...connectionOptions, ...extraOptions };
};
