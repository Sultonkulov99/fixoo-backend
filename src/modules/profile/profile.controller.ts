import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/jwt-auth.gurads';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ProfileService } from './profile.service';

@ApiBearerAuth()
@Controller('my')
export class ProfileController {
    constructor(private readonly profileService: ProfileService){}

    @UseGuards(AuthGuard)
    @Get("profile")
    getProfileInfo(@Req() req : Request){
        return this.profileService.getProfileInfo(req['user'].id)
    }

}
