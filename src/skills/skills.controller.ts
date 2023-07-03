import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles-auth-decorator';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiTags("Skills")
@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @ApiOperation({ summary: "Skill create" })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post('create')
  async create(@Body() createSkillDto: CreateSkillDto) {
    return this.skillsService.create(createSkillDto);
  }

  @ApiOperation({ summary: "Skill find all" })
  @Get('find-all')
  async findAll() {
    return this.skillsService.findAll();
  }

  @ApiOperation({ summary: "Skill find by id" })
  @Get('find/:id')
  async findOne(@Param('id') id: string) {
    return this.skillsService.findOne(+id);
  }

  @ApiOperation({ summary: "Skill update by id" })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Put('update/:id')
  async update(@Param('id') id: string, @Body() updateSkillDto: UpdateSkillDto) {
    return this.skillsService.update(+id, updateSkillDto);
  }

  @ApiOperation({ summary: "Skill delete by id" })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    return this.skillsService.remove(+id);
  }
}
