import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Users } from './models/user.model';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
@Module({
  imports: [SequelizeModule.forFeature([Users]), JwtModule],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}





