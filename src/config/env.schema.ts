/**
 * env.schema.ts
 * -----------------
 * Raw env schema: validation of environment variables (raw env).
 * Uses `zod` to describe and validate expected keys in `process.env`.
 * Exports `rawEnvSchema` and the type `RawEnv` to be consumed by the
 * configuration orchestrator (`configuration.ts`).
 */

import { z } from 'zod';

// Raw env schema: validate incoming strings from process.env
export const rawEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(3000),
  // Postgres: either POSTGRES_URI or individual parts
  POSTGRES_URI: z.string().optional(),
  POSTGRES_HOST: z.string().optional(),
  POSTGRES_PORT: z.coerce.number().int().positive().optional(),
  POSTGRES_USER: z.string().optional(),
  POSTGRES_PASSWORD: z.string().optional(),
  POSTGRES_DB: z.string().optional(),
  // Mongo: either MONGO_URI or individual parts
  MONGO_URI: z.string().optional(),
  MONGO_HOST: z.string().optional(),
  MONGO_PORT: z.coerce.number().int().positive().optional(),
  MONGO_USER: z.string().optional(),
  MONGO_PASSWORD: z.string().optional(),
  MONGO_DB: z.string().optional(),

  // Security
  JWT_SECRET: z.string().min(8).optional(),
  JWT_EXPIRES_IN: z.string().optional(),

  // External services
  GOOGLE_MAPS_API_KEY: z.string().optional(),

  // Misc
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  CORS_ORIGINS: z.string().optional(), // comma separated
});

export type RawEnv = z.infer<typeof rawEnvSchema>;
