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
            const newPlayer = new this.playerModel(player);
            return await newPlayer.save();
        } catch(error: any) {
            throw new Error(error);
        }
    }
}
