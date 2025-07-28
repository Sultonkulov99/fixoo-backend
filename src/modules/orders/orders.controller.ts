import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from 'src/common/guards/jwt-auth.gurads';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/role';
import { UserRole } from '@prisma/client';
import { Request } from 'express';
import { CreateOrderDto } from './dto/create.orders.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('api/v1')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    @ApiBearerAuth()
    @ApiOperation({
        summary: 'CLIENT'
    })
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.USER)
    @Post("orders")
    createOrder(
        @Req() req: Request,
        @Body() payload: CreateOrderDto
    ) {
        return this.ordersService.createOrder(req['user'].id, payload)
    }
}
