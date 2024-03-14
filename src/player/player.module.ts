import { Module } from '@nestjs/common';
import { PlayerModel, PlayerSchema } from './player.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerService } from './player.service';

@Module({
    imports: [
        MongooseModule.forFeature([{name: PlayerModel.name, schema: PlayerSchema }])
    ],
    providers: [PlayerService]
})
export class PlayerModule {}
