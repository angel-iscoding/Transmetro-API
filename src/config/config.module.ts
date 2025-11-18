/**
 * config.module.ts
 * -----------------
 * Nest module that registers `@nestjs/config` as global and applies the
 * central validation (`validateEnv`). It also provides `APP_CONFIG` for
 * injection into other providers of the application.
 */

import { Module } from '@nestjs/common';
import {
  ConfigModule as NestConfigModule,
  ConfigService,
} from '@nestjs/config';
import validateEnv, { AppConfig } from './configuration';
import { getAppConfig } from './index';
import { APP_CONFIG } from './constants';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      // Load env files in order: .env.{NODE_ENV} then .env
      envFilePath: [`.env.${process.env.NODE_ENV || 'development'}`, '.env'],
      validate: validateEnv,
      cache: true,
    }),
  ],
  providers: [
    {
      provide: APP_CONFIG,
      useFactory: (configService: ConfigService): AppConfig =>
        getAppConfig(configService),
      inject: [ConfigService],
    },
  ],
  exports: [APP_CONFIG],
})
export class AppConfigModule {}
