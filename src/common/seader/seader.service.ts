import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserRole } from '@prisma/client';

@Injectable()
export class SeederService implements OnModuleInit {
    constructor(private prisma: PrismaService) {}

    async onModuleInit() {

        const password = await bcrypt.hash("12345678", 10);

        await this.prisma.user.upsert({
            where: { phone: "+998900000000" },
            create: {
                firstName: "Admin",
                lastName: "Adminov",
                phone: "+998900000000",
                password,
                role: UserRole.ADMIN,
            },
            update: {}
        });

        await this.prisma.user.upsert({
            where: { phone: "+998903641207" },
            create: {
                firstName: "Faxriddin",
                lastName: "Asqaraliyev",
                phone: "+998903641207",
                password,
                role: UserRole.MASTER,
                region: "namangan",
                district: "namangan_shahar",
                profession: "electrician",
                add_address:"Namangan shahar"
            },
            update: {}
        });
        await this.prisma.user.upsert({
            where: { phone: "+998900001122" },
            create: {
                firstName: "Ali",
                lastName: "Valiyev",
                phone: "+998900001122",
                password,
                role: UserRole.USER,
                region: "Toshkent"
            },
            update: {}
        });

        console.log("ADMIN, MASTER, USER yaratildi!");
    }
}
