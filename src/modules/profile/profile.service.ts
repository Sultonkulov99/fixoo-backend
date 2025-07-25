import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { createReadStream, existsSync, ReadStream} from 'fs';
import { join } from 'path';
import { PrismaService } from 'src/core/database/prisma.service';

@Injectable()
export class ProfileService {
    constructor(private prisma: PrismaService) { }

    private readonly basePath = join(__dirname, '..', '..', '..', 'uploads');

    private readonly folderMap = {
        image: 'images',
        video: 'videos',
        text: 'texts',
        pdf: 'docs',
        other: 'others',
    };

    async getFileStream(fileType: string, filename: string): Promise<ReadStream> {
        const folder = this.folderMap[fileType];
        if (!folder) {
            throw new BadRequestException('Noto‘g‘ri fileType');
        }

        const filePath = join(this.basePath, folder, filename);

        if (!existsSync(filePath)) {
            throw new NotFoundException('Fayl topilmadi');
        }

        return createReadStream(filePath);
    }

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

    async getFiles(id: string) {
        let files = await this.prisma.files.findMany({
            where: { userId: id }
        })

        return {
            success: true,
            data: files
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
