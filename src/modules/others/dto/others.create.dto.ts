import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class RegionCreateDto{
    @ApiProperty({
        example:"Sirdaryo"
    })
    @IsNotEmpty()
    @IsString()
    name:string
}

export class DistrictCreateDto{
    @ApiProperty({
        example:"Guliston"
    })
    @IsNotEmpty()
    @IsString()
    name:string

    @ApiProperty({
        example:1
    })
    @IsNotEmpty()
    @IsNumber()
    regionId:number
}
