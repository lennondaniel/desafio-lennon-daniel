import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerModule } from './player/player.module';
import { ExternalApisModule } from './external-apis/external-apis.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: `mongodb://${configService.get<string>('MONGO_USERNAME')}:
                ${configService.get<string>('MONGO_PASSWORD')}@
                ${configService.get<string>('MONGO_HOST')}:
                ${configService.get<string>('MONGO_PORT')}/
                ${configService.get<string>('MONGO_DATABASE')}`.replace(/\s+/gm, '')
            }),
            inject: [ConfigService]
        }),
        PlayerModule,
        ExternalApisModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
