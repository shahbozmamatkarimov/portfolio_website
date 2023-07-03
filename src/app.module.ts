import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { AboutUsModule } from './about-us/about-us.module';
import { SocialMediaModule } from './social-media/social-media.module';
import { ProjectsModule } from './projects/projects.module';
import { WorkedsModule } from './workeds/workeds.module';
import { MessagesModule } from './messages/messages.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { Users } from './users/models/user.model';
import { AboutUs } from './about-us/models/about-us.model';
import { SocialMedia } from './social-media/models/social-media.model';
import { Project } from './projects/models/project.model';
import { Worked } from './workeds/models/worked.model';
import { Message } from './messages/models/message.model';
import { Post } from './posts/models/post.model';
import { Comment } from './comments/models/comment.model';
import { SkillsModule } from './skills/skills.module';
import { Skill } from './skills/models/skill.modal';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [Users, AboutUs, SocialMedia, Project, Worked, Message, Post, Comment, Skill],
      autoLoadModels: true,
      logging: false,
    }),
    UsersModule,
    AboutUsModule,
    SocialMediaModule,
    ProjectsModule,
    WorkedsModule,
    MessagesModule,
    PostsModule,
    CommentsModule,
    SkillsModule,
],
  controllers: [],
  providers: [],
})
export class AppModule { }
