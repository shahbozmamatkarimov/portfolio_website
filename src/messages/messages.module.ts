import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Message } from './models/message.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Message]), JwtModule],
  controllers: [MessagesController],
  providers: [MessagesService]
})
export class MessagesModule {}
