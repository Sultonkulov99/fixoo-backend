import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsOptional, IsString } from "class-validator"

export class MasterQueryDto {

    @ApiProperty({
        required: false,
    })
    @IsString()
    @IsOptional()
    firstName?: string

    @ApiProperty({
        required: false,
    })
    @IsString()
    @IsOptional()
    lastName?: string

    @ApiProperty({
        required: false,
    })
    @IsString()
    @IsOptional()
    profession?: string

    @ApiProperty({
        required: false,
    })
    @IsString()
    @IsOptional()
    region?: string

    @ApiProperty({
        required: false,
    })
    @IsString()
    @IsOptional()
    district?: string

    @ApiProperty({
        required: false,
    })
    @Type(() => Number)
    @IsOptional()
    limit?: number

    @ApiProperty({
        required: false,
    })
    @Type(() => Number)
    @IsOptional()
    page?: number
}