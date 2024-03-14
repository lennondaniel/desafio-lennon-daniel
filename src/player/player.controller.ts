import { Controller, Get } from '@nestjs/common';
import { PlayerService } from './player.service';
import { Player } from './interfaces/player.interface';

@Controller('players')
export class PlayerController {
    constructor(private readonly playerService: PlayerService){}

    @Get()
    async importPlayers(): Promise<void> {
        this.playerService.importPlayersFromFootballApi();
    }
}
