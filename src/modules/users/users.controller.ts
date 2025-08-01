import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/common/guards/jwt-auth.gurads';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/role';
import { UserRole } from '@prisma/client';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { QueryDto } from '../masters/dto/master.query.dto';
import { CreateAdminDto } from './dto/create.admin.dto';

@Controller('api/v1')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @ApiBearerAuth()
    @ApiOperation({
        summary: 'ADMIN'
    })
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @Get('clients/all')
    getAllClients(@Query() query : QueryDto) {
        return this.userService.getAllClients(query)
    }


    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get("users/:id")
    getSingleUser(@Param("id") id: string) {
        return this.userService.getSingleUser(id)
    } 

    @ApiBearerAuth()
    @ApiOperation({
        summary: 'ADMIN'
    })
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @Post('create/admin')
    addAdmin(@Body() payload : CreateAdminDto) {
        return this.userService.addAdmin(payload)
    }

}
