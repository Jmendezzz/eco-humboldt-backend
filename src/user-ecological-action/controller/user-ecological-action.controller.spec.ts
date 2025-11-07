import { Test, TestingModule } from '@nestjs/testing';
import { UserEcologicalActionController } from './user-ecological-action.controller';

describe('UserEcologicalActionController', () => {
  let controller: UserEcologicalActionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserEcologicalActionController],
    }).compile();

    controller = module.get<UserEcologicalActionController>(UserEcologicalActionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
