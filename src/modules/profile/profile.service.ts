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
                profession:true,
                region: true,
                district: true,
            },
        });

        return {
            success: true,
            data: profile
        }
    }

   async createFiles(userId: string, fileType: string, fileUrl: string) {
    const created = await this.prisma.files.create({
        data: {
            fileType,
            fileUrl,
            userId,
        },
    });

    return {
        id: created.id,
        fileType: created.fileType,
        fileUrl: created.fileUrl,
    };
}

}
