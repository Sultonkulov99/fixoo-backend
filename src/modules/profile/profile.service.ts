import { Injectable } from '@nestjs/common';
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
                phone:true,
                role:true,
                add_address:true,
                profession: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                region: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                district: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });

        return {
            success: true,
            data: profile
        }
    }
}
