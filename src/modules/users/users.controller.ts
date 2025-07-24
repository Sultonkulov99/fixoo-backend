import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/common/guards/jwt-auth.gurads';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/role';
import { UserRole } from '@prisma/client';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { MasterQueryDto } from './dto/master.query.dto';

@Controller('api/v1')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Get('mentors')
    getSingelMaster(@Query() query : MasterQueryDto){
        return this.userService.getSingelMaster(query)
    }

    @Get('masters/all')
    getAllMasters() {
        return this.userService.getAllMasters()
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
    @Get('users/all')
    getAllUser() {
        return this.userService.getAllUser()
    }
}
