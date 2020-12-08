declare namespace NodeJS {
  export interface ProcessEnv {
    TYPEORM_USERNAME: string;
    TYPEORM_DATABASE: string;
    TYPEORM_PASSWORD: string;
    TYPEORM_CONNECTION: string;
  }
}
