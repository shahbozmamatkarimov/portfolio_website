import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles-auth-decorator';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiTags("Messages")
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @ApiOperation({ summary: "Message send" })
  @Roles("ADMIN", "USER")
  @UseGuards(RolesGuard)
  @Post('send')
  async create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  @ApiOperation({ summary: "Message find all" })
  @Roles("ADMIN", "USER")
  @UseGuards(RolesGuard)
  @Get('find-all')
  async findAll() {
    return this.messagesService.findAll();
  }

  @ApiOperation({ summary: "Message find by id" })
  @Roles("ADMIN", "USER")
  @UseGuards(RolesGuard)
  @Get('find/:id')
  async findOne(@Param('id') id: string) {
    return this.messagesService.findOne(+id);
  }

  @ApiOperation({ summary: "Message update by id" })
  @Roles("ADMIN", "USER")
  @UseGuards(RolesGuard)
  @Put('update/:id')
  async update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messagesService.update(+id, updateMessageDto);
  }

  @ApiOperation({ summary: "Message delete by id" })
  @Roles("ADMIN", "USER")
  @UseGuards(RolesGuard)
  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    return this.messagesService.remove(+id);
  }
}
