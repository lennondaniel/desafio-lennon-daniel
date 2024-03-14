import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios, { AxiosInstance } from "axios";


@Injectable()
export class FootballApiService {
    private axiosInstance: AxiosInstance;

    constructor(private readonly configService: ConfigService) {
        this.axiosInstance = axios.create({
            baseURL: configService.get<string>('API_FOOTBALL_URL', ''),
            headers: {
                'X-RapidAPI-Key': this.configService.get<string>('API_FOOTBALL_KEY', ''),
                'X-RapidAPI-Host': this.configService.get<string>('API_FOOTBALL_HOST', '')
            }
        })
    }

    async getPlayers(paging = 1): Promise<any> {
        try {
            const response = await this.axiosInstance.get('/players', {
                params: {
                    league: '71',
                    season: '2020',
                    page: paging
                }
            });

            return response.data;
        } catch(error: any) {
            throw new Error(error);
        }

    }
}