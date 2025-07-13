import { Module } from '@nestjs/common';
import { PrismaModule } from './core/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { RedisModule } from './common/redis/redis.module';

@Module({
  imports: [PrismaModule, AuthModule, UsersModule, RedisModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
