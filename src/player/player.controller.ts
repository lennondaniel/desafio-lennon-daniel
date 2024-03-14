import { Controller, Get } from '@nestjs/common';
import { PlayerService } from './player.service';
import { Player } from './player.interface';

@Controller('players')
export class PlayerController {
    constructor(private readonly playerService: PlayerService){}

    @Get('import-players')
    async importPlayers(): Promise<void> {
        await this.playerService.importPlayersFromFootballApi();
    }

    @Get()
    async getPlaryes() {
        return await this.playerService.getPlayers(['player', 'statistics']);
    }

    @Get('write-spreadsheet')
    async writeSpreadsSheet() {
        return await this.playerService.writePlayersToGoogleSheet();
    }
}
