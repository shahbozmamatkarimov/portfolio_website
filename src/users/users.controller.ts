import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res, HttpCode, HttpStatus, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles-auth-decorator';
import { Response } from 'express';
import { CookieGetter } from 'src/decorators/cookieGetter.decorator';
import { Users } from './models/user.model';

@ApiTags("Users")
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: "User created" })
  @Post('login')
  async create(@Body() createUserDto: CreateUserDto, @Res({ passthrough: true }) res: Response) {
    return this.usersService.create(createUserDto, res);
  }

  @ApiOperation({ summary: "Admin created" })
  @Post('admin-login')
  async login(@Body() createUserDto: CreateUserDto, @Res({ passthrough: true }) res: Response) {
    return this.usersService.login(createUserDto, res);
  }


  @ApiOperation({ summary: "User SignOut" })
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(
    @CookieGetter('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.logout(refreshToken, res)
  }

  @ApiOperation({ summary: "User find all" })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Get("find-all")
  async findAll(@Query() query: string) {
    return this.usersService.findAll(query);
  }

  @ApiOperation({ summary: "User find by id" })
  @Get('find/:id')
  async findOne(@Param('id') id: string): Promise<Users> {
    return this.usersService.findOne(+id);
  }

  @ApiOperation({ summary: "User update by id" })
  @Put('update/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: "User delete by  id" })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
