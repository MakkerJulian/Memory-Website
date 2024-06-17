import { FullGame, Game } from "./gameType";

export type Player = {
    username: string;
    email: string;
}

export type FullPlayer = {
    id: number;
    name: string;
    email: string;
    games: FullGame[];
}

export type PlayerWithScore = Player & {
    score: number;
}

export type Preferences = {
    preffered_api: string;
    color_closed: string;
    color_found: string;
}