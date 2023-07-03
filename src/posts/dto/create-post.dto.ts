import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreatePostDto {
    @ApiProperty({example: "img or video", description: "Post content"})
    @IsString()
    @IsNotEmpty()
    content: string;

    @ApiProperty({example: "title", description: "Post Title"})
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({example: "descriptionn", description: "Post Description"})
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({example: "#uzb #trend", description: "Post Teg"})
    @IsString()
    @IsNotEmpty()
    teg: string;
}
