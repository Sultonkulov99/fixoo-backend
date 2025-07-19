import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { ProfessionCreateDto } from './dto/profession.create.dto';

@Injectable()
export class ProfessionsService {
    constructor(private prisma: PrismaService) { }

    async getProfessions() {
        let professions = await this.prisma.profession.findMany()

        return {
            success: true,
            data: professions
        }
    }

    async createProfession(payload: ProfessionCreateDto) {
        let profession = await this.prisma.profession.findUnique({
            where: {
                name: payload.name
            }
        })

        if (profession) {
            throw new ConflictException("Profession name already exists!")
        }

        let newProfession = await this.prisma.profession.create({
            data: {
                name: payload.name
            }
        })

        return {
            success: true,
            data: newProfession
        }
    }

    async deleteProfession(id : number){
        let profession = await this.prisma.profession.findFirst({
            where: { id }
        })

        if (!profession) {
            throw new NotFoundException("Profession spesific id not found!")
        }

        await this.prisma.profession.delete({
            where:{id}
        })

        return {
            success: true,
            message:"Profession successfully deleted"
        }

    }
}
