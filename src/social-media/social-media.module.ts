import { Module } from '@nestjs/common';
import { SocialMediaService } from './social-media.service';
import { SocialMediaController } from './social-media.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { SocialMedia } from './models/social-media.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([SocialMedia]), JwtModule],
  controllers: [SocialMediaController],
  providers: [SocialMediaService]
})
export class SocialMediaModule {}
