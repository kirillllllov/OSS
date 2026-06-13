import { PartialType } from '@nestjs/swagger';
import { OwnerCreateDto } from './owner-create.dto';
export class UpdateOwnerDto extends PartialType(OwnerCreateDto) {}
