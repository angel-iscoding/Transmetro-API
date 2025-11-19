/**
 * transform.ts
 * -----------------
 * Utilities for transforming the validated `RawEnv` into `AppConfig`.
 * Includes helpers to build Postgres and Mongo URIs from individual parts
 * and the `transformParsedEnvToAppConfig` function.
 */

import { RawEnv } from './env.schema';
import { AppConfig } from './types';

// Helper to build a Postgres connection string from parts
export const buildPostgresUri = (parts: {
  host?: string;
  port?: number;
  user?: string;
  password?: string;
  db?: string;
}) => {
  if (!parts.host || !parts.db) return undefined;
  const auth = parts.user ? `${encodeURIComponent(parts.user)}:${encodeURIComponent(parts.password ?? '')}@` : '';
  const port = parts.port ? `:${parts.port}` : '';
  return `postgresql://${auth}${parts.host}${port}/${parts.db}`;
};

// Helper to build Mongo URI if not provided
export const buildMongoUri = (parts: {
  host?: string;
  port?: number;
  user?: string;
  password?: string;
  db?: string;
}) => {
  if (!parts.host) return undefined;
  const auth = parts.user ? `${encodeURIComponent(parts.user)}:${encodeURIComponent(parts.password ?? '')}@` : '';
  const port = parts.port ? `:${parts.port}` : '';
  const db = parts.db ? `/${parts.db}` : '';
  return `mongodb://${auth}${parts.host}${port}${db}`;
};

export const transformParsedEnvToAppConfig = (parsed: RawEnv): AppConfig => {
  const corsOrigins = parsed.CORS_ORIGINS
    ? parsed.CORS_ORIGINS.split(',').map((s) => s.trim()).filter(Boolean)
    : undefined;

  const postgresUri = parsed.POSTGRES_URI ?? buildPostgresUri({
    host: parsed.POSTGRES_HOST,
    port: parsed.POSTGRES_PORT,
    user: parsed.POSTGRES_USER,
    password: parsed.POSTGRES_PASSWORD,
    db: parsed.POSTGRES_DB,
  });

  const mongoUri = parsed.MONGO_URI ?? buildMongoUri({
    host: parsed.MONGO_HOST,
    port: parsed.MONGO_PORT,
    user: parsed.MONGO_USER,
    password: parsed.MONGO_PASSWORD,
    db: parsed.MONGO_DB,
  });

  return {
    nodeEnv: parsed.NODE_ENV,
    port: parsed.PORT,
    logLevel: parsed.LOG_LEVEL,
    corsOrigins,
    database: {
      uri: postgresUri,
      host: parsed.POSTGRES_HOST,
      port: parsed.POSTGRES_PORT,
      user: parsed.POSTGRES_USER,
      password: parsed.POSTGRES_PASSWORD,
      name: parsed.POSTGRES_DB,
    },
    mongo: {
      uri: mongoUri,
      host: parsed.MONGO_HOST,
      port: parsed.MONGO_PORT,
      user: parsed.MONGO_USER,
      password: parsed.MONGO_PASSWORD,
      db: parsed.MONGO_DB,
    },
    jwt: {
      secret: parsed.JWT_SECRET,
      expiresIn: parsed.JWT_EXPIRES_IN,
    },
    google: {
      mapsApiKey: parsed.GOOGLE_MAPS_API_KEY,
    },
  };
};
