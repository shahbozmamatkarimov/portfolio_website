import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty({example: "john@gmail.com", description: "Email"})
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({example: "qwerty", description: "Password"})
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({example: "key", description: "key"})
    @IsString()
    @IsNotEmpty()
    key?: string;
}
