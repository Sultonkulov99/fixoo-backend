import { ApiProperty } from "@nestjs/swagger"
import { UserRole } from "@prisma/client"
import { IsNotEmpty, IsString, Matches, IsPhoneNumber, Length, IsUUID, IsEnum, IsOptional } from "class-validator"

export class registerDto {
    @ApiProperty({
        example:"Abduxoshim"
    })
    @IsNotEmpty()
    @IsString()
    @Length(3, 20)
    firstName: string

    @ApiProperty({
        example:"Sultonqulov"
    })
    @IsNotEmpty()
    @IsString()
    @Length(3, 20)
    lastName: string

    @ApiProperty({
        example: '+998902400025',
    })
    @IsNotEmpty()
    @IsString()
    @IsPhoneNumber('UZ')
    phone: string

    @ApiProperty({
        example: "12345678"
    })
    @Matches(/^[a-zA-Z0-9]{6,20}$/)
    password: string

    @ApiProperty({
        example: "string"
    })
    @IsEnum(UserRole)
    role: UserRole

    @ApiProperty({
        example: "0000"
    })
    @IsString()
    otp: string;

    @ApiProperty({ example: 'Istiqlol kocha, 32-uy', required: false })
    @IsOptional()
    @IsString()
    add_address?: string

    @ApiProperty({ example: '7c2061f1-fd9a-4b91-92f5-1a1f17846b5a', required: false })
    @IsOptional()
    @IsUUID()
    professionId?: number

    @ApiProperty({ example: '7c2061f1-fd9a-4b91-92f5-1a1f17846b5a', required: false })
    @IsOptional()
    @IsUUID() 
    regionId?: number

    @ApiProperty({ example: '7c2061f1-fd9a-4b91-92f5-1a1f17846b5a', required: false })
    @IsUUID()
    @IsOptional()
    districtId?: number
}
