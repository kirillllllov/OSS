import { PartialType } from '@nestjs/swagger';
import { CreatePremiseDto } from './premise-create.dto';

export class UpdatePremiseDto extends PartialType(CreatePremiseDto) {}
