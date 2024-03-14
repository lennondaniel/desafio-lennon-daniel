import { Module } from '@nestjs/common';
import { PlayerModel, PlayerSchema } from './player.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import { ExternalApisModule } from 'src/external-apis/external-apis.module';

@Module({
    imports: [
        ExternalApisModule,
        MongooseModule.forFeature([{name: PlayerModel.name, schema: PlayerSchema }])
    ],
    providers: [PlayerService],
    controllers: [PlayerController]
})
export class PlayerModule {}
