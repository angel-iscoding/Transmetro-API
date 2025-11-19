/**
 * types.ts
 * -----------------
 * Public types related to the application configuration.
 * Defines `AppConfig`, the typed (camelCase) shape that the application will consume
 * after validating and transforming `process.env`.
 */

import { RawEnv } from './env.schema';

// Application configuration shape exposed to the app (camelCase, typed)
export type AppConfig = {
  nodeEnv: RawEnv['NODE_ENV'];
  port: number;
  logLevel: RawEnv['LOG_LEVEL'];
  corsOrigins?: string[];

  database: {
    uri?: string; 
    host?: string;
    port?: number;
    user?: string;
    password?: string;
    name?: string;
  };

  mongo: {
    uri?: string;
    host?: string;
    port?: number;
    user?: string;
    password?: string;
    db?: string;
  };

  jwt?: {
    secret?: string;
    expiresIn?: string;
  };

  google?: {
    mapsApiKey?: string;
  };
};

export default AppConfig;
