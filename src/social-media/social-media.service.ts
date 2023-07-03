import { Injectable } from '@nestjs/common';
import { CreateSocialMediaDto } from './dto/create-social-media.dto';
import { UpdateSocialMediaDto } from './dto/update-social-media.dto';
import { InjectModel } from '@nestjs/sequelize';
import { SocialMedia } from './models/social-media.model';

@Injectable()
export class SocialMediaService {
  constructor(@InjectModel(SocialMedia) private socialMediaRepo: typeof SocialMedia) { }

  async create(createSocialMediaDto: CreateSocialMediaDto) {
    await this.socialMediaRepo.create({ ...createSocialMediaDto });
    const response = {
      msg: "Social Medial created successfuly!"
    }
    return response;
  }

  async findAll() {
    return await this.socialMediaRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<SocialMedia> {
    return await this.socialMediaRepo.findByPk(id, { include: { all: true } });
  }

  async update(id: number, updateSocialMediaDto: UpdateSocialMediaDto) {
    await this.socialMediaRepo.update(updateSocialMediaDto, { where: { id } })

    const response = {
      msg: "Social Medial update successfuly!"
    }
    return response;
  }

  async remove(id: number) {
    await this.socialMediaRepo.destroy({ where: { id } });

    const response = {
      msg: "Social Medial delete successfuly!"
    }
    return response;
  }
}
