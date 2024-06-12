import { Game } from "./gameType";

export type AdminAggregateResult = {
    aantal_spellen: number;
    aantal_spelers: number;
    games: Game[];
}