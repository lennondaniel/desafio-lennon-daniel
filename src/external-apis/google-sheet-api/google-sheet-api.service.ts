import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import * as credentials from '../../../credentials.json';
import { JWT } from 'google-auth-library';
import { ConfigService } from '@nestjs/config';
import { Player } from 'src/player/player.interface';

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

    formatToSpreadSheet(players: Player[]) {
        const newArray = [];
        const newObj = {}
        for(const {player, statistics} of players) {
            for(const objPla in player ){
                if(typeof player[objPla] === 'object'){
                  for(const subObjPla in player[objPla]) {
                    newObj[`player.${objPla}.${subObjPla}`] = player[objPla][subObjPla];
                  }
                } else {
                    newObj[`player.${objPla}`] = player[objPla];
                }
            }
    
            for(const objSta in statistics[0]) {
                if(typeof statistics[0][objSta] === 'object') {
                    for(const subObjSta in statistics[0][objSta]) {
                        newObj[`statistics.${objSta}.${subObjSta}`] = statistics[0][objSta][subObjSta];
                    }
                } else {
                    newObj[`statistics.${objSta}`] = statistics[0][objSta];
                }
            }
            newArray.push(newObj)
        }
    
        return newArray;
    }

    async updateSpreadsheet(players: Player[]) {
        try {
            const values = this.formatToSpreadSheet(players);
   
            const headers = Object.keys(values[0]);
            const reqBody= {
                values: [
                    headers,
                    ...values.map((object) => Object.values(object))
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
