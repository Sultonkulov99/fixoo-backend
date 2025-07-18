import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';

@Injectable()
export class UsersService {
    constructor(
        private prisma : PrismaService
    ){}

    async getSingleUser(id : string){
        let user = await this.prisma.user.findFirst({
            where:{
                id:id
            }
        })

        return {
            success:true,
            data:user
        }
    }
}
