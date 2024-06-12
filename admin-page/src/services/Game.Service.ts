import { Injectable } from "@angular/core";
import { FullGame } from "../types/gameType";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class GameService {
    constructor(private http: HttpClient) { }
    getAll(){
        return this.http.get<FullGame[]>('http://localhost:8000/game/all')
    }
}

