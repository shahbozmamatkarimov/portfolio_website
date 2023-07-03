import { Injectable } from '@nestjs/common';
import { CreateWorkedDto } from './dto/create-worked.dto';
import { UpdateWorkedDto } from './dto/update-worked.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Worked } from './models/worked.model';

@Injectable()
export class WorkedsService {
  constructor(@InjectModel(Worked) private workedRepo: typeof Worked) { }

  async create(createWorkedDto: CreateWorkedDto) {
    await this.workedRepo.create({ ...createWorkedDto });
    const response = {
      msg: "Worked created successfuly!"
    }
    return response;
  }

  async findAll() {
    return await this.workedRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Worked> {
    return await this.workedRepo.findByPk(id, { include: { all: true } });
  }

  async update(id: number, updateWorkedDto: UpdateWorkedDto) {
    await this.workedRepo.update(updateWorkedDto, { where: { id } })

    const response = {
      msg: "Worked update successfuly!"
    }
    return response;
  }

  async remove(id: number) {
    await this.workedRepo.destroy({ where: { id } });

    const response = {
      msg: "Worked delete successfuly!"
    }
    return response;
  }
}
