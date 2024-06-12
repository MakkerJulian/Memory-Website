import { Injectable } from "@angular/core";
import { Score } from "../types/scoreType";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class DefaultService {
    constructor(private http: HttpClient) { }
    async getScores() {
        return this.http.get<Score[]>('http://localhost:8000/scores')
    }
}

