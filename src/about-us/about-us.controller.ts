import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { AboutUsService } from './about-us.service';
import { CreateAboutUsDto } from './dto/create-about-us.dto';
import { UpdateAboutUsDto } from './dto/update-about-us.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles-auth-decorator';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiTags("AboutUs")
@Controller('about-us')
export class AboutUsController {
  constructor(private readonly aboutUsService: AboutUsService) {}

  @ApiOperation({ summary: "AboutUs create" })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post('create')
  async create(@Body() createAboutUsDto: CreateAboutUsDto) {
    return this.aboutUsService.create(createAboutUsDto);
  }

  @ApiOperation({ summary: "AboutUs find all" })
  @Get('find-all')
  async findAll() {
    return this.aboutUsService.findAll();
  }

  @ApiOperation({ summary: "AboutUs find by id" })
  @Get('find/:id')
  async findOne(@Param('id') id: string) {
    return this.aboutUsService.findOne(+id);
  }

  @ApiOperation({ summary: "AboutUs update by id" })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Put('update/:id')
  async update(@Param('id') id: string, @Body() updateAboutUsDto: UpdateAboutUsDto) {
    return this.aboutUsService.update(+id, updateAboutUsDto);
  }

  @ApiOperation({ summary: "AboutUs delete by id" })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    return this.aboutUsService.remove(+id);
  }
}
