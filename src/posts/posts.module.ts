import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from './models/post.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Post]), JwtModule],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
