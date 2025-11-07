import { Test, TestingModule } from '@nestjs/testing';
import { EcologicalActionService } from './ecological-action.service';

describe('EcologicalActionService', () => {
  let service: EcologicalActionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EcologicalActionService],
    }).compile();

    service = module.get<EcologicalActionService>(EcologicalActionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
