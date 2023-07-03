import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsObject, IsString } from "class-validator";

export class CreateProjectDto {
    @ApiProperty({example: "GitHub", description: "Project Name"})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({example: "https://image", description: "Project Image"})
    @IsString()
    @IsNotEmpty()
    image: string;

    @ApiProperty({example: "https://my-site", description: "Link UI"})
    @IsString()
    @IsNotEmpty()
    link_project_ui: string;

    @ApiProperty({example: "https://github", description: "Link Code"})
    @IsString()
    @IsNotEmpty()
    link_project_code: string;

    @ApiProperty({example: "desxription", description: "Description"})
    @IsString()
    @IsNotEmpty()
    description: string;
}
