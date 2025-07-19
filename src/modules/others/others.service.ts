import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { DistrictCreateDto, RegionCreateDto } from './dto/others.create.dto';

@Injectable()
export class OthersService {
    constructor(private prisma : PrismaService){}

    async getDistricts(id : number){
        let districts = await this.prisma.district.findMany({
            where:{
                regionId:id
            }
        })

        return {
            success:true,
            data:districts
        }
    }

    async getRegions(){
        let regions = await this.prisma.region.findMany()

        return {
            success:true,
            data:regions
        }
    }

    async createRegion(payload : RegionCreateDto){
        let region = await this.prisma.region.findUnique({
            where:{
                name : payload.name
            }
        })

        if(region){
            throw new ConflictException("Region name already exists!")
        }

        let newRegion = await this.prisma.region.create({
            data:{
                name : payload.name
            }
        })

        return {
            success: true,
            data:newRegion
        }
    }

    async createDistrict(payload : DistrictCreateDto){
        let district = await this.prisma.district.findFirst({
            where:{
                name : payload.name
            }
        })

        if(district){
            throw new ConflictException("District name already exists!")
        }

        let newDistrict = await this.prisma.district.create({
            data:{
                name : payload.name,
                regionId:payload.regionId
            }
        })

        return {
            success: true,
            data:newDistrict
        }
    }
}
