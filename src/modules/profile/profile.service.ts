import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { createReadStream, existsSync, ReadStream} from 'fs';
import { join } from 'path';
import { PrismaService } from 'src/core/database/prisma.service';

@Injectable()
export class ProfileService {
    constructor(private prisma: PrismaService) { }

    async getProfileInfo(id: string) {
        const profile = await this.prisma.user.findFirst({
            where: { id },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                phone: true,
                role: true,
                add_address: true,
                profession: true,
                region: true,
                district: true,
            },
        });

        return {
            success: true,
            data: profile
        }
    }

}
