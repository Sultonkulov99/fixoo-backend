import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { MasterQueryDto } from './dto/master.query.dto';

@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismaService
    ) { }

    async getSingelMaster(query: MasterQueryDto) {
        let where = {}
        where['role'] = "MASTER" 
        if (query.firstName) {
            where['firstName'] = query.firstName.trim()
        }
        if (query.lastName) {
            where['lastName'] = query.lastName.trim()
        }
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
                select:{
                    id:true,
                    firstName:true,
                    lastName:true,
                    profession:true,
                    region:true,
                    district:true,
                    add_address:true
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

    async getSingleUser(id: string) {
        let user = await this.prisma.user.findFirst({
            where: {
                id
            }
        })

        return {
            success: true,
            data: user
        }
    }

    async getAllUser() {
        let user = await this.prisma.user.findMany()

        return {
            success: true,
            data: user
        }
    }

    async getAllMasters() {
        let masters = await this.prisma.user.findMany({
            where: {
                role: "MASTER"
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                phone: true,
                profession:true,
                district:true,
                region:true
            }
        })

        return {
            success: true,
            data: masters
        }
    }
}
