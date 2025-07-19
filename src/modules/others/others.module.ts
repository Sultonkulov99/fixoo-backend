import { Module } from '@nestjs/common';
import { OthersController } from './others.controller';
import { OthersService } from './others.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [OthersController],
  providers: [OthersService,JwtService]
})
export class OthersModule {}
