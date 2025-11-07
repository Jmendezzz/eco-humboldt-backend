import { Test, TestingModule } from '@nestjs/testing';
import { EcologicalActionController } from './ecological-action.controller';
import { EcologicalActionService } from '../service/ecological-action.service';

describe('EcologicalActionController', () => {
  let controller: EcologicalActionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EcologicalActionController],
      providers: [EcologicalActionService],
    }).compile();

    controller = module.get<EcologicalActionController>(EcologicalActionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
