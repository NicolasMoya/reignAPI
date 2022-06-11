import { Test, TestingModule } from '@nestjs/testing';
import { ArcticlesService } from './arcticles.service';

describe('ArcticlesService', () => {
  let service: ArcticlesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArcticlesService],
    }).compile();

    service = module.get<ArcticlesService>(ArcticlesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
