import { Test, TestingModule } from '@nestjs/testing';
import { GoogleSheetApiService } from './google-sheet-api.service';

describe('GoogleSheetApiService', () => {
  let service: GoogleSheetApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoogleSheetApiService],
    }).compile();

    service = module.get<GoogleSheetApiService>(GoogleSheetApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
