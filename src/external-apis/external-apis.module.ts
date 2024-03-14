import { Module } from '@nestjs/common';
import { FootballApiService } from './football-api/football-api.service';
import { GoogleSheetApiService } from './google-sheet-api/google-sheet-api.service';

@Module({
  providers: [FootballApiService, GoogleSheetApiService],
  exports: [FootballApiService, GoogleSheetApiService]
})
export class ExternalApisModule {}
