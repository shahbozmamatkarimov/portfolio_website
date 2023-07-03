import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateWorkedDto {
    @ApiProperty({example: "GitHub", description: "Work Name"})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({example: "https://work", description: "Work Link"})
    @IsString()
    @IsNotEmpty()
    link: string;
}
