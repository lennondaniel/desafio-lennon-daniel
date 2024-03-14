import { Module } from '@nestjs/common';
import { PlayerModel, PlayerSchema } from './player.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forFeature([{name: PlayerModel.name, schema: PlayerSchema }])
    ]
})
export class PlayerModule {}
