import { Module } from '@nestjs/common';
import { PrismaModule } from './core/database/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { RedisModule } from './common/redis/redis.module';
import { VerificationModule } from './modules/verification/verification.module';
import { ConfigModule } from '@nestjs/config';
import { ProfileModule } from './modules/profile/profile.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads','videos'),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads','images'),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads','texts'),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads','docs'),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads','others'),
    }), 

    PrismaModule, 
    AuthModule, 
    RedisModule, 
    VerificationModule,
    UsersModule,
    ProfileModule
  ]
})
export class AppModule { }
