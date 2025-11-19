/**
 * configuration.ts
 * -----------------
 * - Entry point for validation and normalization of configuration.
 * - imports the rawEnvSchema (zod schema) to validate process.env.
 * - delegates transformation to transformParsedEnvToAppConfig and exposes
 * - validateEnv for use with ConfigModule.forRoot({ validate }).
 */

import { rawEnvSchema } from './env.schema';
import { transformParsedEnvToAppConfig } from './transform';
export type { AppConfig } from './types';

// validateEnv transforms raw env into typed AppConfig. Used by Nest ConfigModule.
export const validateEnv = (env: Record<string, unknown>) => {
  const parsed = rawEnvSchema.parse(env as any);
  return transformParsedEnvToAppConfig(parsed);
};

export default validateEnv;

