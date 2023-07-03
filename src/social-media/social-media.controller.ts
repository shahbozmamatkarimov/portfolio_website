import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { SocialMediaService } from './social-media.service';
import { CreateSocialMediaDto } from './dto/create-social-media.dto';
import { UpdateSocialMediaDto } from './dto/update-social-media.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles-auth-decorator';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiTags("Social Media")
@Controller('social-media')
export class SocialMediaController {
  constructor(private readonly socialMediaService: SocialMediaService) {}

  @ApiOperation({ summary: "Social Media create" })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post('create')
  async create(@Body() createSocialMediaDto: CreateSocialMediaDto) {
    return this.socialMediaService.create(createSocialMediaDto);
  }

  @ApiOperation({ summary: "Social Media find all" })
  @Get('find-all')
  async findAll() {
    return this.socialMediaService.findAll();
  }

  @ApiOperation({ summary: "Social Media find by id" })
  @Get('find/:id')
  async findOne(@Param('id') id: string) {
    return this.socialMediaService.findOne(+id);
  }

  @ApiOperation({ summary: "Social Media update by id" })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Put('update/:id')
  async update(@Param('id') id: string, @Body() updateSocialMediaDto: UpdateSocialMediaDto) {
    return this.socialMediaService.update(+id, updateSocialMediaDto);
  }

  @ApiOperation({ summary: "Social Media delete by id" })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    return this.socialMediaService.remove(+id);
  }
}
