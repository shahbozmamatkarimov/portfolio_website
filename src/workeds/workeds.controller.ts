import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { WorkedsService } from './workeds.service';
import { CreateWorkedDto } from './dto/create-worked.dto';
import { UpdateWorkedDto } from './dto/update-worked.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles-auth-decorator';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiTags("Workeds")
@Controller('workeds')
export class WorkedsController {
  constructor(private readonly workedsService: WorkedsService) {}

  @ApiOperation({ summary: "Worked create" })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post('create')
  async create(@Body() createWorkedDto: CreateWorkedDto) {
    return this.workedsService.create(createWorkedDto);
  }

  @ApiOperation({ summary: "Worked find all" })
  @Get('find-all')
  async findAll() {
    return this.workedsService.findAll();
  }

  @ApiOperation({ summary: "Worked find by id" })
  @Get('find/:id')
  async findOne(@Param('id') id: string) {
    return this.workedsService.findOne(+id);
  }

  @ApiOperation({ summary: "Worked update by id" })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Put('update/:id')
  async update(@Param('id') id: string, @Body() updateWorkedDto: UpdateWorkedDto) {
    return this.workedsService.update(+id, updateWorkedDto);
  }

  @ApiOperation({ summary: "Worked delete by id" })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    return this.workedsService.remove(+id);
  }
}
