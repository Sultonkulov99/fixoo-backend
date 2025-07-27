import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsOptional, IsString } from "class-validator"

export class MasterQueryDto {
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

export class QueryDto {
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