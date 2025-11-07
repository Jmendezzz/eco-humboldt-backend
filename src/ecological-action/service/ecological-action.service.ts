import { Injectable } from '@nestjs/common';
import { CreateEcologicalActionRequestDto } from '../dto/create-ecological-action-request.dto';
import { UpdateEcologicalActionRequestDto } from '../dto/update-ecological-action-request.dto';
import { EcologicalAction } from '../entities/ecological-action.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EcologicalActionResponseDto } from '../dto/ecological-action-response.dto';
import { EcologicalActionNotFoundException } from '../exceptions/ecological-action-not-found.exception';

@Injectable()
export class EcologicalActionService {

  constructor(
    @InjectRepository(EcologicalAction)
    private readonly ecologicalActionRepository: Repository<EcologicalAction>
  ) { }

  async create(createEcologicalActionDto: CreateEcologicalActionRequestDto): Promise<EcologicalActionResponseDto> {
    const ecologicalActionSaved = await this.ecologicalActionRepository.save(createEcologicalActionDto);

    return this.toDto(ecologicalActionSaved as unknown as EcologicalAction);
  }

  async findAll(): Promise<EcologicalActionResponseDto[]> {
    const ecologicalActions = await this.ecologicalActionRepository.find();

    return ecologicalActions.map(ecologicalAction => this.toDto(ecologicalAction));
  }

  async findOne(id: number): Promise<EcologicalActionResponseDto> {
    const ecologicalAction = await this.ecologicalActionRepository.findOne({ where: { id } });

    if (!ecologicalAction) throw new EcologicalActionNotFoundException();

    return this.toDto(ecologicalAction);
  }

  async update(id: number, updateEcologicalActionDto: UpdateEcologicalActionRequestDto): Promise<EcologicalActionResponseDto> {
    const ecologicalAction = await this.ecologicalActionRepository.find({ where: { id } });

    if (!ecologicalAction) throw new EcologicalActionNotFoundException();

    updateEcologicalActionDto = Object.assign(updateEcologicalActionDto, ecologicalAction);

    const ecologicalActionUpdated = await this.ecologicalActionRepository.save(updateEcologicalActionDto);

    return this.toDto(ecologicalActionUpdated);
  }

  async remove(id: number): Promise<Boolean> {
    const existingEcologicalAction = await this.ecologicalActionRepository.exists({ where: { id } });

    if (!existingEcologicalAction) throw new EcologicalActionNotFoundException();

    return true;
  }


  private toDto(ecologicalAction: EcologicalAction): EcologicalActionResponseDto {
    return {
      id: ecologicalAction.id,
      name: ecologicalAction.name,
      description: ecologicalAction.description,
      points: ecologicalAction.points,
      createdAt: ecologicalAction.createdAt
    };

  }
}
