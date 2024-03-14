import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PlayerModel } from './player.schema';
import { Model } from 'mongoose';
import { Player, PlayerData } from './player.interface';
import { FootballApiService } from 'src/external-apis/football-api/football-api.service';
import { FootballApiResponse } from 'src/external-apis/football-api/football-api.interface';
import { GoogleSheetApiService } from 'src/external-apis/google-sheet-api/google-sheet-api.service';

@Injectable()
export class PlayerService {
    constructor(
        @InjectModel(PlayerModel.name) private readonly playerModel: Model<PlayerModel>,
        private readonly footballApiService: FootballApiService,
        private readonly googleSheetApiService: GoogleSheetApiService
    ){}

    async createPlayer(player: Player): Promise<Player>{
        try {
            const playerNew = new this.playerModel(player);
            return await playerNew.save();
        } catch(error: any) {
            console.log(error);
            throw new Error(error);
        }
    }

    async getPlayers(select: Array<string>): Promise<PlayerData[]> {
        return await this.playerModel.find({}).select(select);
    }

    async formatImportedPlayers(players: Player[]): Promise<void> {
        for(const player of players) {
            await this.createPlayer(player);
        }
    }

    async importPlayersFromFootballApi(): Promise<void> {
        let numberOfPlayers = 0;
        let response: FootballApiResponse;
        let paging = 1;
        while(numberOfPlayers < 200) {
            response = await this.footballApiService.getPlayers(paging);
            if(response.paging.current < response.paging.total) {
                this,this.formatImportedPlayers(response.response);   
                numberOfPlayers += response.results;
                paging++;
            }
        }
    }

    async writePlayersToGoogleSheet(): Promise<void> {
        const players = await this.getPlayers(['player']);
        this.googleSheetApiService.updateSpreadsheet(players)

        
    }
}
