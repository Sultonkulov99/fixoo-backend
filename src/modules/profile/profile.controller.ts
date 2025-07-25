import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/jwt-auth.gurads';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import { Request } from 'express';

@Controller()
export class ProfileController {
    constructor(private readonly profileService: ProfileService) { }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get("api/v1/my/profile")
    getProfileInfo(@Req() req: Request) {
        return this.profileService.getProfileInfo(req['user'].id)
    }

}
