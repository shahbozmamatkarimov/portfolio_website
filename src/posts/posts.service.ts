import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './models/post.model';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post) private postRepo: typeof Post) { }

  async create(createPostDto: CreatePostDto) {
    await this.postRepo.create({ ...createPostDto });
    const response = {
      msg: "Post created successfuly!"
    }
    return response;
  }

  async findAll() {
    return await this.postRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Post> {
    return await this.postRepo.findByPk(id, { include: { all: true } });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    await this.postRepo.update(updatePostDto, { where: { id } })

    const response = {
      msg: "Post update successfuly!"
    }
    return response;
  }

  async remove(id: number) {
    await this.postRepo.destroy({ where: { id } });

    const response = {
      msg: "Post delete successfuly!"
    }
    return response;
  }
}
