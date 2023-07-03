import { PartialType } from '@nestjs/swagger';
import { CreateWorkedDto } from './create-worked.dto';

export class UpdateWorkedDto extends PartialType(CreateWorkedDto) {}
