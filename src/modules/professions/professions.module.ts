import { Module } from '@nestjs/common';
import { ProfessionsService } from './professions.service';
import { ProfessionsController } from './professions.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [ProfessionsService,JwtService],
  controllers: [ProfessionsController]
})
export class ProfessionsModule {}
