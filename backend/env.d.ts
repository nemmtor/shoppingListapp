declare namespace NodeJS {
  export interface ProcessEnv {
    TYPEORM_USERNAME: string;
    TYPEORM_DATABASE: string;
    TYPEORM_PASSWORD: string;
    TYPEORM_CONNECTION: string;
    TYPEORM_ENTIITES: string;
    TYPEORM_MIGRATIONS: string;
    TYPEORM_MIGRATIONS_DIR: string;
  }
}
