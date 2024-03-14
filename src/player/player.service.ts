import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PlayerModel } from './player.schema';
import { Model } from 'mongoose';
import { Player } from './interfaces/player.interface';

@Injectable()
export class PlayerService {
    constructor(@InjectModel(PlayerModel.name) private readonly playerModel: Model<PlayerModel>){}

    async createPlayer(player: Player): Promise<Player>{
        try {
            const playerNew = new this.playerModel(player);
            return await playerNew.save();
        } catch(error: any) {
            console.log(error);
            throw new Error(error);
        }
    }
}
