import { Module } from '@nestjs/common';
import { MastersController } from './masters.controller';
import { MastersService } from './masters.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [MastersController],
  providers: [MastersService,JwtService]
})
export class MastersModule {}
