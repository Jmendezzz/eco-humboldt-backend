import { Test, TestingModule } from '@nestjs/testing';
import { EcologicalActionQrController } from './ecological-action-qr.controller';

describe('EcologicalActionQrController', () => {
  let controller: EcologicalActionQrController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EcologicalActionQrController],
    }).compile();

    controller = module.get<EcologicalActionQrController>(EcologicalActionQrController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
