import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import * as credentials from '../../../credentials.json';
import { JWT } from 'google-auth-library';
import { ConfigService } from '@nestjs/config';
import { Player } from 'src/player/player.interface';
import { flattie } from 'flattie';

@Injectable()
export class GoogleSheetApiService {
    private googleCredentials: GoogleCredentials;
    private sheets: any;
    private spreadsheetId: string;

    constructor(private readonly configService: ConfigService) {
        this.googleCredentials = credentials;
        const client = new JWT({
            email: this.googleCredentials.client_email || '',
            key: this.googleCredentials.private_key || '',
            scopes: ['https://www.googleapis.com/auth/spreadsheets']
        })

        this.sheets = google.sheets({ version: "v4", auth: client });
        this.spreadsheetId = this.configService.get<string>('GOOGLE_SHEET_ID', '');
    }

    async getDoc() {
        try {
            const response = await this.sheets.spreadsheets.values.get({
                spreadsheetId: this.spreadsheetId,
                range: "A:D", // Range to read
            });

            const values = response.data.values;

            if (!values) {
                console.log("No data found.");
            } else {
                console.log("Data:");
                values.forEach((row) => {
                    console.log(row.join("\t"));
                });
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    flattenObject(obj, prefix = "") {
        return Object.entries(obj).reduce((acc, [key, value]) => {
            value = value ?? '';
            const newPrefix = prefix ? `${prefix}.${key}` : key;
            if (typeof value === 'object' && !Array.isArray(value)) {
                return Object.assign({}, acc, this.flattenObject(value, newPrefix));
            } else {
                if (key === 'statistics' && Array.isArray(value)) {
                    return Object.assign({}, acc, ...value.map((statistic) =>  {
                        this.replaceNullValues(statistic);
                        return this.flattenObject(statistic, newPrefix);
                    }));
                }
    
                acc[newPrefix] = value;
                return acc;
            }
        }, {});
    }
      
    replaceNullValues(obj) {
        Object.entries(obj).forEach(([key, value]) => {
          if (value === null) {
            obj[key] = '';
          } else if (typeof value === "object") {
            this.replaceNullValues(value);
          }
        });
    }

    async updateSpreadsheet(players: Player[]) {
        try {
            const data = [...players.map((item) => {
                return {
                    player: item.player,
                    statistics: item.statistics
                }
            })];

            const flattenedArray = data.map(item => this.flattenObject(item));

            const headers = Object.keys(flattenedArray);
            const reqBody= {
                values: [
                    headers,
                    ...flattenedArray.map((object) => Object.values(object))
                ]
            }
            await this.sheets.spreadsheets.values.update({
                spreadsheetId: this.spreadsheetId,
                range: 'A:AAG',
                valueInputOption: 'USER_ENTERED',
                resource: reqBody
            });
        } catch(error) {
            throw new Error(error);
        }
    }
}
