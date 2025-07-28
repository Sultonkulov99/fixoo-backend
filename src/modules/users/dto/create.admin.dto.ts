import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, Matches, IsPhoneNumber, Length} from "class-validator"

export class CreateAdminDto {
    @ApiProperty({
        example: "Abduxoshim"
    })
    @IsNotEmpty()
    @IsString()
    @Length(3, 20)
    firstName: string

    @ApiProperty({
        example: "Sultonqulov"
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
}