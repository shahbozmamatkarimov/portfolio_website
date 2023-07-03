import { Module } from '@nestjs/common';
import { WorkedsService } from './workeds.service';
import { WorkedsController } from './workeds.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Worked } from './models/worked.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports : [SequelizeModule.forFeature([Worked]), JwtModule],
  controllers: [WorkedsController],
  providers: [WorkedsService]
})
export class WorkedsModule {}
