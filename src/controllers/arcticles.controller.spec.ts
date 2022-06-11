import { Test, TestingModule } from '@nestjs/testing';
import { ArcticlesController } from './arcticles.controller';

describe('ArcticlesController', () => {
  let controller: ArcticlesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArcticlesController],
    }).compile();

    controller = module.get<ArcticlesController>(ArcticlesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
