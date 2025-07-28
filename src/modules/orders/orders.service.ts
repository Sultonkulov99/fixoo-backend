import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { CreateOrderDto } from './dto/create.orders.dto';

@Injectable()
export class OrdersService {
    constructor(private prisma : PrismaService){}

    async createOrder(clientId:string,payload:CreateOrderDto){
        const client = await this.prisma.user.findFirst({
            where:{id:clientId}
        })
        if(!client){
            throw new NotFoundException("Client not found")
        }

        const master = await this.prisma.user.findFirst({
            where:{id:payload.masterId}
        })
        if(!master){
            throw new NotFoundException("Master not found")
        }

        await this.prisma.orders.create({
            data:{
                ...payload,
                clientId
            }
        })

        return {
            success:true,
            message:"New order added successfully"
        }
    }
}
