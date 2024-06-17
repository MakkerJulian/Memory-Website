import { Injectable } from "@angular/core";
import { AdminAggregateResult } from "../types/adminTypes";
import { Player } from "../types/playerType";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class AdminService {

    constructor(private http: HttpClient) { }

    async getAggregatedData() {
        return this.http.get<AdminAggregateResult>('api/admin/aggregate');
    }

    getPlayers() {
        return this.http.get<Player[]>('http://localhost:8000/api/admin/players');
    }

    async getDates() {
        //Return example {
        // "2024-05-31": 1,
        // "2024-06-12": 1}
        return this.http.get('http://localhost:8000/api/admin/dates');
    }
}

