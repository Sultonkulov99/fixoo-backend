import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { QueryDto } from '../masters/dto/master.query.dto';
import { CreateAdminDto } from './dto/create.admin.dto';
import * as bcrypt from 'bcrypt'

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

    async addAdmin(payload:CreateAdminDto){
        let user = await this.prisma.user.findFirst({
            where:{phone:payload.phone}
        })
        if(user){
            throw new BadRequestException("User already exists!")
        }
        let hash = await bcrypt.hash(payload.password,10)

        await this.prisma.user.create({
            data:{
                ...payload,
                password : hash,
                role:"ADMIN"
            }
        })

        return {
            success:true,
            message:"New admin added successfully!"
        }
    }
}
