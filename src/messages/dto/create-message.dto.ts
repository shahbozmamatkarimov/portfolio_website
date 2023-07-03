import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMessageDto {
    @ApiProperty({example: "1", description: "ID"})
    @IsNumber()
    @IsNotEmpty()
    user_id: number;

    @ApiProperty({example: "Message", description: "Message"})
    @IsString()
    @IsNotEmpty()
    message: string;
}
