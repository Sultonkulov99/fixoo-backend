import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OthersService } from './others.service';
import { DistrictCreateDto, RegionCreateDto } from './dto/others.create.dto';
import { AuthGuard } from 'src/common/guards/jwt-auth.gurads';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/role';
import { UserRole } from '@prisma/client';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Others")
@Controller('others')
export class OthersController {
    constructor(private readonly othersService : OthersService){}

    @Get("districts")
    getDistricts(@Param("id") id: number){
        return this.othersService.getDistricts(id)
    }

    @Get("regions")
    getRegions(){
        return this.othersService.getRegions()
    }

    // @ApiBearerAuth()
    // @ApiOperation({
    //     summary:"ADMIN"
    // })
    // @UseGuards(AuthGuard,RolesGuard)
    // @Roles(UserRole.ADMIN)
    @Post("region")
    createRegion(@Body() payload : RegionCreateDto){
        return this.othersService.createRegion(payload)
    }

    // @ApiBearerAuth()
    // @ApiOperation({
    //     summary:"ADMIN"
    // })
    // @UseGuards(AuthGuard,RolesGuard)
    // @Roles(UserRole.ADMIN)
    @Post("district")
    createDistrict(@Body() payload : DistrictCreateDto){
        return this.othersService.createDistrict(payload)
    }
}
