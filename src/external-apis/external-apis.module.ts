import { Module } from '@nestjs/common';
import { FootballApiService } from './football-api/football-api.service';

@Module({
  providers: [FootballApiService],
  exports: [FootballApiService]
})
export class ExternalApisModule {}
