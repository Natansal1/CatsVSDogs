import { Test, TestingModule } from '@nestjs/testing';
import { Dogs } from './dogs';

describe('Dogs', () => {
  let provider: Dogs;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Dogs],
    }).compile();

    provider = module.get<Dogs>(Dogs);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
