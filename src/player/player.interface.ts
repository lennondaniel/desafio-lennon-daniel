export interface Player {
    player: {
        id: number;
        name: string;
        firstname: string;
        lastname: string;
        age: number;
        birth: {
            date: string;
            place: string;
            country: string;
        };
        nationality: string;
        height: string;
        weight: string;
        injured: boolean;
        photo: string;
        events?: number;
    };
    statistics: [{
        team: {
            id: number;
            name: string;
            logo: string
        },
        league: {
            id: number
            name: string;
            country: string;
            logo: string;
            flag: string;
            season: number;
        },
        games: {
            appearences: number;
            lineups: number;
            minutes: number;
            number: number;
            position: string;
            rating: string;
            captain: boolean;
        },
        substitutes: {
            in: number;
            out: number;
            bench: number;
        },
        shots: {
            total: number;
            on: number;
        },
        goals: {
            total: number;
            conceded: number;
            assists: number;
            saves: string;
        },
        passes: {
            total: number;
            key: number;
            accuracy: number;
        },
        tackles: {
            total: number;
            blocks: number;
            interceptions: number;
        },
        duels: {
            total: number;
            won: number;
        },
        dribbles: {
            attempts: number;
            success: number;
            past: string;
        },
        fouls: {
            drawn: number;
            committed: number;
        },
        cards: {
            yellow: number;
            yellowred: number;
            red: number;
        },
        penalty: {
            won: string
            commited: string
            scored: number;
            missed: number;
            saved: string;
        };
    }]
}

export interface PlayerData extends Player {
    player: {
        id: number;
        name: string;
        firstname: string;
        lastname: string;
        age: number;
        birth: {
            date: string;
            place: string;
            country: string;
        };
        nationality: string;
        height: string;
        weight: string;
        injured: boolean;
        photo: string;
        events?: number;
    };
}