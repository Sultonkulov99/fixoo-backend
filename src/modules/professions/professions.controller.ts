import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ProfessionsService } from './professions.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/role';
import { UserRole } from '@prisma/client';
import { AuthGuard } from 'src/common/guards/jwt-auth.gurads';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { ProfessionCreateDto } from './dto/profession.create.dto';

@Controller('professions')
export class ProfessionsController {
    constructor(private readonly professionService: ProfessionsService) { }

    @Get()
    getProfessions() {
        return this.professionService.getProfessions()
    }

    @ApiBearerAuth()
    @ApiOperation({
        summary: "ADMIN"
    })
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @Post()
    createProfession(@Body() payload: ProfessionCreateDto) {
        return this.professionService.createProfession(payload)
    }

    @ApiBearerAuth()
    @ApiOperation({
        summary: "ADMIN"
    })
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @Delete("id")
    deleteProfession(@Param("id") id: number) {
        return this.professionService.deleteProfession(id)
    }
}
