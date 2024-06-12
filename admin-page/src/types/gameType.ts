export type Game = {
    api: string;
    aantal: number;
}

export type FullGame = {
    date: {
        date: string;
        timezone_type: number;
        timezone: string;
    }
    day: string;
    score: number;
    api: string;
    color_closed: string;
    color_found: string;
}