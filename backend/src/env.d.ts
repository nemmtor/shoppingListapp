// Types for .env
declare namespace NodeJS {
  export interface ProcessEnv {
    TYPEORM_USERNAME: string;
    TYPEORM_DATABASE: string;
    TYPEORM_PASSWORD: string;
    TYPEORM_CONNECTION: string;
    TYPEORM_ENTITIES: string;
    TYPEORM_MIGRATIONS: string;
    TYPEORM_MIGRATIONS_DIR: string;
    JWT_SECRET: string;
  }
}
