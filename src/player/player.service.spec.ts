import { Test, TestingModule } from '@nestjs/testing';
import { PlayerService } from './player.service';
import { getModelToken,  } from '@nestjs/mongoose';
import { PlayerModel } from './player.schema';
import { Model } from 'mongoose';

describe('PlayerService', () => {
    let playerService: PlayerService;
    let model: Model<PlayerModel>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PlayerService,
                { provide: getModelToken(PlayerModel.name), useValue: model },
            ],
        }).compile();

        playerService = module.get<PlayerService>(PlayerService);
    });

    it('should be defined', () => {
        expect(playerService).toBeDefined();
    });
});
