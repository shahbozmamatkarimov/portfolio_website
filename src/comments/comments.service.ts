import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './models/comment.model';

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment) private commentRepo: typeof Comment) { }

  async create(createCommentDto: CreateCommentDto) {
    await this.commentRepo.create({ ...createCommentDto });
    const response = {
      msg: "Comment push successfuly!"
    }
    return response;
  }

  async findAll() {
    return await this.commentRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Comment> {
    return await this.commentRepo.findByPk(id, { include: { all: true } });
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    await this.commentRepo.update(updateCommentDto, { where: { id } })

    const response = {
      msg: "Comment update successfuly!"
    }
    return response;
  }

  async remove(id: number) {
    await this.commentRepo.destroy({ where: { id } });

    const response = {
      msg: "Comment delete successfuly!"
    }
    return response;
  }
}
