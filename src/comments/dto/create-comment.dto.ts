import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCommentDto {
    @ApiProperty({example: "1", description: "User ID"})
    @IsNumber()
    @IsNotEmpty()
    user_id: number;

    @ApiProperty({example: "1", description: "Post ID"})
    @IsNumber()
    @IsNotEmpty()
    post_id: number;

    @ApiProperty({example: "Message", description: "Message"})
    @IsString()
    @IsNotEmpty()
    comment: string;
}
