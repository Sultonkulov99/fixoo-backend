import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { MasterQueryDto, QueryDto } from './dto/master.query.dto';

@Injectable()
export class MastersService {
    constructor(private prisma: PrismaService) { }

    async getSingelMaster(query: MasterQueryDto) {
        let where = {}
        where['role'] = "MASTER"
        if (query.profession) {
            where['profession'] = query.profession.trim()
        }
        if (query.region) {
            where['region'] = query.region.trim()
        }
        if (query.district) {
            where['district'] = query.district.trim()
        }

        const limit = query.limit ? Number(query.limit) : 10;
        const page = query.page ? Number(query.page) : 1;
        const skip = (page - 1) * limit;

        const [data, total] = await Promise.all([
            this.prisma.user.findMany({
                where,
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    phone: true,
                    profession: true,
                    region: true,
                    district: true,
                    add_address: true
                },
                take: limit,
                skip,
            }),
            this.prisma.user.count({
                where,
            }),
        ]);

        return {
            success: true,
            data,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit),
            },
        };

    }

    async getAllMasters(query: QueryDto) {
        const limit = query.limit ? Number(query.limit) : 10;
        const page = query.page ? Number(query.page) : 1;
        const skip = (page - 1) * limit;

        let masters = await this.prisma.user.findMany({
            where: {
                role: "MASTER"
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                phone: true,
                profession: true,
                district: true,
                region: true
            },
            take: limit,
            skip
        })

        return {
            success: true,
            data: masters
        }
    }

    async deleteMaster(id: string) {
        let master = await this.prisma.user.findFirst({
            where: {
                id,
                role: "MASTER"
            }
        })

        if (!master) {
            return {
                success: false,
                message: "Master not found"
            }
        }

        await this.prisma.user.delete({
            where: {
                id
            }
        })

        return {
            success: true,
            message: "Master deleted successfully"
        }
    }
}
