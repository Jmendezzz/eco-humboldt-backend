import { Test, TestingModule } from '@nestjs/testing';
import { EcologicalActionQrService } from './ecological-action-qr.service';

describe('EcologicalActionQrService', () => {
  let service: EcologicalActionQrService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EcologicalActionQrService],
    }).compile();

    service = module.get<EcologicalActionQrService>(EcologicalActionQrService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
