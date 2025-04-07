// src/app.module.ts
import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import ormConfig from './infrastructure/orm/orm.config';
import { NotesModule } from './infrastructure/modules/notes.module';
import * as redisStore from 'cache-manager-ioredis';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MikroOrmModule.forRoot(ormConfig),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('REDIS_HOST') || 'localhost',
        port: configService.get<number>('REDIS_PORT'),
        ttl: 60, // TTL in seconds
      }),
      isGlobal: true, // Makes the cache available in all modules without re-importing
    }),
    NotesModule,
  ],
})
export class AppModule {}
