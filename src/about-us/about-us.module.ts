import { Module } from '@nestjs/common';
import { AboutUsService } from './about-us.service';
import { AboutUsController } from './about-us.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AboutUs } from './models/about-us.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([AboutUs]), JwtModule],
  controllers: [AboutUsController],
  providers: [AboutUsService]
})
export class AboutUsModule {}
