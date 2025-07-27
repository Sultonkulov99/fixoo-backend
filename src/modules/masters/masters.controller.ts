import { Controller, Delete, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { MastersService } from './masters.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/role';
import { UserRole } from '@prisma/client';
import { AuthGuard } from 'src/common/guards/jwt-auth.gurads';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { MasterQueryDto, QueryDto } from './dto/master.query.dto';

@Controller('api/v1')
export class MastersController {
    constructor(private readonly mastersService: MastersService) { }

    @Get('masters')
    getSingelMaster(@Query() query: MasterQueryDto) {
        return this.mastersService.getSingelMaster(query)
    }

    @ApiBearerAuth()
    @ApiOperation({
        summary: 'ADMIN'
    })
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @Get('masters/all')
    getAllMasters(@Query() query: QueryDto) {
        return this.mastersService.getAllMasters(query)
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.MASTER)
    @ApiOperation({
        summary: 'ADMIN'
    })
    @Delete('masters')
    deleteMaster(@Param() id: string){
        return this.mastersService.deleteMaster(id);
    }  
}
