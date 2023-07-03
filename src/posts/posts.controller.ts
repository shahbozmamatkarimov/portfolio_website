import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles-auth-decorator';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiTags("Posts")
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({ summary: "Post create" })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post('create')
  async create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @ApiOperation({ summary: "Post find all" })
  @Get('find-all')
  async findAll() {
    return this.postsService.findAll();
  }

  @ApiOperation({ summary: "Post find by id" })
  @Get('find/:id')
  async findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @ApiOperation({ summary: "Post update by id" })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Put('update/:id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @ApiOperation({ summary: "Post delete by id" })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
