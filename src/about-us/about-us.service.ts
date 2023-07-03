import { Injectable } from '@nestjs/common';
import { CreateAboutUsDto } from './dto/create-about-us.dto';
import { UpdateAboutUsDto } from './dto/update-about-us.dto';
import { InjectModel } from '@nestjs/sequelize';
import { AboutUs } from './models/about-us.model';

@Injectable()
export class AboutUsService {
  constructor(@InjectModel(AboutUs) private aboutUsRepo: typeof AboutUs) { }

  async create(createAboutUsDto: CreateAboutUsDto) {
    await this.aboutUsRepo.create({ ...createAboutUsDto });
    const response = {
      msg: "About created successfuly!"
    }
    return response;
  }

  async findAll() {
    return await this.aboutUsRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<AboutUs> {
    return await this.aboutUsRepo.findByPk(id, { include: { all: true } });
  }

  async update(id: number, updateAboutUsDto: UpdateAboutUsDto) {
    await this.aboutUsRepo.update(updateAboutUsDto, { where: { id } })

    const response = {
      msg: "About update successfuly!"
    }
    return response;
  }

  async remove(id: number) {
    await this.aboutUsRepo.destroy({ where: { id } });

    const response = {
      msg: "About delete successfuly!"
    }
    return response;
  }
}
