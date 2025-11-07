import { Test, TestingModule } from '@nestjs/testing';
import { UserEcologicalActionService } from './user-ecological-action.service';

describe('UserEcologicalActionService', () => {
  let service: UserEcologicalActionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserEcologicalActionService],
    }).compile();

    service = module.get<UserEcologicalActionService>(UserEcologicalActionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
