import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/common/guards/jwt-auth.gurads';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/role';
import { UserRole } from '@prisma/client';
import { RolesGuard } from 'src/common/guards/roles.guard';

@ApiBearerAuth()
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){}

    @UseGuards(AuthGuard)
    @Get(":id")
    getSingleUser(@Param("id") id : string){
        return this.userService.getSingleUser(id)
    }

    @ApiOperation({
        summary:'ADMIN'
    })
    @UseGuards(AuthGuard,RolesGuard)
    @Roles(UserRole.ADMIN)
    @Get('all')
    getAllUser() {
        return this.userService.getAllUser()
    }
}
