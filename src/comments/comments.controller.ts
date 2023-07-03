import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles-auth-decorator';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiTags("Comments")
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: "Comment push" })
  @Roles("ADMIN", "USER")
  @UseGuards(RolesGuard)
  @Post('push')
  async create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @ApiOperation({ summary: "Comment find all" })
  @Get('find-all')
  async findAll() {
    return this.commentsService.findAll();
  }

  @ApiOperation({ summary: "Comment find by id" })
  @Get('find/:id')
  async findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @ApiOperation({ summary: "Comment update by id" })
  @Roles("ADMIN", "USER")
  @UseGuards(RolesGuard)
  @Put('update/:id')
  async update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @ApiOperation({ summary: "Comment delete by id" })
  @Roles("ADMIN", "USER")
  @UseGuards(RolesGuard)
  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
