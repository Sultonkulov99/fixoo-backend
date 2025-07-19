import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ProfessionCreateDto{
    @ApiProperty({
        example:"Usta"
    })
    @IsNotEmpty()
    @IsString()
    name:string
}