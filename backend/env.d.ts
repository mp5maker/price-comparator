declare namespace NodeJS {
  export interface ProcessEnv {
    JWT_SECRET: string;
    JWT_SITE_NAME: string;
    DATABASE_TYPE: string;
    DATABASE_HOST: string;
    DATABASE_PORT: string;
    DATABASE_USERNAME: string;
    DATABASE_PASSWORD: string;
    DATABASE_NAME: string;
    NODE_PORT: string;
    ELASTICSEARCH_HOST: string;
    ELASTICSEARCH_API_VERSION: string;
  }
}
