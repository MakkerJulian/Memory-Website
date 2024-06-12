import { Injectable } from "@angular/core";
import { FullPlayer, Player, Preferences } from "../types/playerType";
import { FullGame } from "../types/gameType";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class PlayerService {
    constructor(private http: HttpClient) { }
    async getPlayer(id: number) {
        return this.http.get<FullPlayer[]>('http://localhost:8000/api/player/' + id)
    }

    async getPlayerGames(id: number) {
        return this.http.get<FullGame[]>('http://localhost:8000/api/player/' + id + '/games')
    }

    async getPreferences(id: number) {
        return this.http.get<Preferences>('http://localhost:8000/api/player/' + id + '/preferences')
    }
}

