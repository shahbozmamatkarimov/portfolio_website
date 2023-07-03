import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateSocialMediaDto {
    @ApiProperty({example: "GitHub", description: "Name"})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({example: "https://github", description: "Link"})
    @IsString()
    @IsNotEmpty()
    link: string;

    @ApiProperty({example: "bx bx-github", description: "Icon"})
    @IsString()
    @IsNotEmpty()
    icon: string;
}
