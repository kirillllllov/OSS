import { PartialType } from '@nestjs/swagger';
import { CreatePremiseDto } from './create-premise.dto';

export class UpdatePremiseDto extends PartialType(CreatePremiseDto) {}