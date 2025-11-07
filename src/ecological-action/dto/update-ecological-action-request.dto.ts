import { PartialType } from '@nestjs/mapped-types';
import { CreateEcologicalActionRequestDto } from './create-ecological-action-request.dto';

export class UpdateEcologicalActionRequestDto extends PartialType(CreateEcologicalActionRequestDto) {}
