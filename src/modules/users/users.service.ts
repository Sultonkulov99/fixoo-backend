import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { MasterQueryDto, QueryDto } from '../masters/dto/master.query.dto';

@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismaService
    ) { }

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

    async getAllClients(query:QueryDto) {
        const limit = query.limit ? Number(query.limit) : 10;
        const page = query.page ? Number(query.page) : 1;
        const skip = (page - 1) * limit;

        let masters = await this.prisma.user.findMany({
            where: {
                role: "USER"
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                phone: true
            },
            take:limit,
            skip
        })

        return {
            success: true,
            data: masters
        }
    }
}
