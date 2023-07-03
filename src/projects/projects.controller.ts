import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles-auth-decorator';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiTags("Projects")
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @ApiOperation({ summary: "Project create" })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post('create')
  async create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @ApiOperation({ summary: "Project find all" })
  @Get('find-all')
  async findAll() {
    return this.projectsService.findAll();
  }

  @ApiOperation({ summary: "Project find by id" })
  @Get('find/:id')
  async findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  @ApiOperation({ summary: "Project update by id" })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Put('update/:id')
  async update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(+id, updateProjectDto);
  }

  @ApiOperation({ summary: "Project delete by id" })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
}
