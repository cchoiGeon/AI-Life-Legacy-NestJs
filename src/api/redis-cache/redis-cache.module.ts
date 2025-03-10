import { Module } from '@nestjs/common';
import { RedisCacheService } from './redis-cache.service';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        config: {
          host: configService.getOrThrow('REDIS_HOST'),
          port: configService.getOrThrow('REDIS_PORT'),
          // password: configService.getOrThrow('REDIS_PASSWORD'),
        },
      }),
    }),
  ],
  providers: [RedisCacheService, ConfigService],
  exports: [RedisCacheService],
})
export class RedisCacheModule {}
