import { Module } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Skill } from './models/skill.modal';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Skill]), JwtModule],
  controllers: [SkillsController],
  providers: [SkillsService]
})
export class SkillsModule {}
