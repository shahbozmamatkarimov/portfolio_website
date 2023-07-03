import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateSkillDto {
    @ApiProperty({example: "VueJs", description: "Skill name"})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({example: "bx bx-vuejs", description: "Skill icon"})
    @IsString()
    @IsNotEmpty()
    icon: string;
}
