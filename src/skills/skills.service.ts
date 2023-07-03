import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Skill } from './models/skill.modal';

@Injectable()
export class SkillsService {
  constructor(@InjectModel(Skill) private skillRepo: typeof Skill) { }

  async create(createSkillDto: CreateSkillDto) {
    await this.skillRepo.create({ ...createSkillDto });
    const response = {
      msg: "Skill created successfuly!"
    }
    return response;
  }

  async findAll() {
    return await this.skillRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Skill> {
    return await this.skillRepo.findByPk(id, { include: { all: true } });
  }

  async update(id: number, updateSkillDto: UpdateSkillDto) {
    await this.skillRepo.update(updateSkillDto, { where: { id } })

    const response = {
      msg: "Skill update successfuly!"
    }
    return response;
  }

  async remove(id: number) {
    await this.skillRepo.destroy({ where: { id } });

    const response = {
      msg: "Skill delete successfuly!"
    }
    return response;
  }
}
