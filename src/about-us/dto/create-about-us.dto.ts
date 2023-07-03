import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from "class-validator";

export class CreateAboutUsDto {
    @ApiProperty({example: "https://image", description: "Image Avatar"})
    @IsString()
    @IsNotEmpty()
    avatar: string;

    @ApiProperty({example: "Joh Doe", description: "Full Name"})
    @IsString()
    @IsNotEmpty()
    fullname: string;

    @ApiProperty({example: "+998901234567", description: "Phone Number"})
    @IsString()
    @IsPhoneNumber()
    @IsNotEmpty()
    phone: string;

    @ApiProperty({example: "john@gmail.com", description: "Email"})
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({example: "09.09.2003", description: "Birthday"})
    @IsString()
    @IsNotEmpty()
    birthday: string;

    @ApiProperty({example: "20", description: "Age"})
    @IsNumber()
    @IsNotEmpty()
    age: number;

    @ApiProperty({example: "about", description: "About Us"})
    @IsString()
    @IsNotEmpty()
    about: string;

    @ApiProperty({example: "5 years", description: "Experience"})
    @IsString()
    @IsNotEmpty()
    experience: string;
}
