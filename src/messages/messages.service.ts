import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Message } from './models/message.model';

@Injectable()
export class MessagesService {
  constructor(@InjectModel(Message) private messageRepo: typeof Message) { }

  async create(createMessageDto: CreateMessageDto) {
    await this.messageRepo.create({ ...createMessageDto });
    const response = {
      msg: "Message send successfuly!"
    }
    return response;
  }

  async findAll() {
    return await this.messageRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Message> {
    return await this.messageRepo.findByPk(id, { include: { all: true } });
  }

  async update(id: number, updateMessageDto: UpdateMessageDto) {
    await this.messageRepo.update(updateMessageDto, { where: { id } })

    const response = {
      msg: "Message update successfuly!"
    }
    return response;
  }

  async remove(id: number) {
    await this.messageRepo.destroy({ where: { id } });

    const response = {
      msg: "Message delete successfuly!"
    }
    return response;
  }
}
