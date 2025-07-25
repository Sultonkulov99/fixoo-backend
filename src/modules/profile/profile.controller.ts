import { BadRequestException, Body, Controller, Get, InternalServerErrorException, Param, Post, Req, UnauthorizedException, UnsupportedMediaTypeException, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/jwt-auth.gurads';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/role';
import { UserRole } from '@prisma/client';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from "uuid"
import * as fs from 'fs';

@Controller()
export class ProfileController {
    constructor(private readonly profileService: ProfileService) { }

    @Get(":fileType/:fileName")
    getViewFile(@Param("fileType") fileType: string, @Param("fileName") fileName: string) {
        return {
            success: true,
            url:`https://fixoo.uz/${fileName}`
        }
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get("api/v1/my/profile")
    getProfileInfo(@Req() req: Request) {
        return this.profileService.getProfileInfo(req['user'].id)
    }

    @ApiBearerAuth()
    @ApiOperation({
        summary: "MASTER"
    })
    @UseGuards(AuthGuard)
    @Get("api/v1/my/files")
    getFiles(@Req() req: Request) {
        return this.profileService.getFiles(req['user'].id)
    }

    @ApiBearerAuth()
    @ApiOperation({
        summary: "MASTER"
    })
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.MASTER)
    @Post("api/v1/profile/files")
    @UseInterceptors(
        AnyFilesInterceptor({
            limits: {
                fileSize: 100 * 1024 * 1024,
            },
            storage: diskStorage({
                destination: (req, file, cb) => {
                    let folder = './uploads/others';
                    if (file.mimetype.startsWith('image/')) folder = './uploads/images';
                    else if (file.mimetype.startsWith('video/')) folder = './uploads/videos';
                    else if (file.mimetype === 'text/plain') folder = './uploads/texts';
                    else if (
                        file.mimetype.includes('pdf') ||
                        file.mimetype.includes('msword')
                    )
                        folder = './uploads/docs';
                    if (!fs.existsSync(folder)) {
                        fs.mkdirSync(folder, { recursive: true });
                    }
                    return cb(null, folder);
                },
                filename: (req, file, cb) => {
                    const filename = uuidv4() + extname(file.originalname);
                    return cb(null, filename);
                },
            }),
            fileFilter: (req, file, cb) => {
                const allowed = [
                    'image/jpeg',
                    'image/jpg',
                    'image/png',
                    'video/mp4',
                    'text/plain',
                    'application/pdf',
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                ];
                if (!allowed.includes(file.mimetype)) {
                    return cb(
                        new UnsupportedMediaTypeException('Fayl turi ruxsat etilmagan'),
                        false,
                    );
                }
                return cb(null, true);
            },
        }),
    )
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Fayllarni yuborish: rasm, video, text, pdf va h.k.',
        schema: {
            type: 'object',
            properties: {
                files: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                },
            },
        },
    })
    async createFiles(
        @Req() req: Request,
        @UploadedFiles() files: Express.Multer.File[]
    ) {
        if (!req['user'] || !req['user'].id) {
            throw new UnauthorizedException('Foydalanuvchi aniqlanmadi');
        }

        if (!files || !files.length) {
            throw new BadRequestException('Hech qanday fayl yuborilmadi');
        }

        try {
            const savedFiles = await Promise.all(
                files.map(async (file) => {
                    let fileType: string;

                    if (file.mimetype.startsWith('image/')) fileType = 'image';
                    else if (file.mimetype.startsWith('video/')) fileType = 'video';
                    else if (file.mimetype === 'text/plain') fileType = 'text';
                    else if (file.mimetype.includes('pdf')) fileType = 'pdf';
                    else fileType = 'other';

                    return await this.profileService.createFiles(
                        req['user'].id,
                        fileType,
                        file.filename,
                    );
                }),
            );

            return {
                success: true,
                files: savedFiles,
            };
        } catch (err) {
            console.error('Xatolik:', err);
            throw new InternalServerErrorException('Faylni yuklashda xatolik');
        }
    }
}
