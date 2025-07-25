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
      serveRoot: '/video',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads','images'),
      serveRoot: '/image',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads','texts'),
      serveRoot: '/text',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads','docs'),
      serveRoot: '/pdf',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads','others'),
      serveRoot: '/other',
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
