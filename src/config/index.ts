/**
 * index.ts
 * -----------------
 * Helper for getting a typed instance of `AppConfig` from
 * Nest's `ConfigService`. Used in the provider that exposes `APP_CONFIG`.
 */

import { ConfigService } from '@nestjs/config';
import { AppConfig } from './configuration';
import { APP_CONFIG } from './constants';

// Helper to retrieve fully-typed config values from Nest's ConfigService
// The ConfigModule validation returns camelCase keys (see validateEnv), so
// we read those keys here to avoid `any` and keep strong typing.
export const getAppConfig = (configService: ConfigService): AppConfig => {
  const nodeEnv = configService.get<string>('nodeEnv') as AppConfig['nodeEnv'];
  const port = Number(configService.get<number | string>('port'));
  const logLevel = configService.get<string>('logLevel') as AppConfig['logLevel'];

  const postgres = configService.get<any>('postgres') || {};
  const mongo = configService.get<any>('mongo') || {};
  const jwt = configService.get<any>('jwt') || {};
  const google = configService.get<any>('google') || {};

  return {
    nodeEnv,
    port,
    logLevel,
    corsOrigins: configService.get<string[]>('corsOrigins'),
    database: {
      uri: postgres.uri,
      host: postgres.host,
      port: postgres.port,
      user: postgres.user,
      password: postgres.password,
      name: postgres.name,
    },
    mongo: {
      uri: mongo.uri,
      host: mongo.host,
      port: mongo.port,
      user: mongo.user,
      password: mongo.password,
      db: mongo.db,
    },
    jwt: {
      secret: jwt.secret,
      expiresIn: jwt.expiresIn,
    },
    google: {
      mapsApiKey: google.mapsApiKey,
    },
  } as AppConfig;
};

export type { AppConfig } from './configuration';
export { APP_CONFIG };
