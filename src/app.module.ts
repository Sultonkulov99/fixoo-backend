import { Module } from '@nestjs/common';
import { PrismaModule } from './core/database/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { RedisModule } from './common/redis/redis.module';
import { VerificationModule } from './modules/verification/verification.module';
import { ConfigModule } from '@nestjs/config';
import { ProfileModule } from './modules/profile/profile.module';
import { OthersModule } from './modules/others/others.module';
import { ProfessionsModule } from './modules/professions/professions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule, 
    AuthModule, 
    RedisModule, 
    VerificationModule,
    UsersModule,
    ProfileModule,
    OthersModule,
    ProfessionsModule,
  ]
})
export class AppModule { }
