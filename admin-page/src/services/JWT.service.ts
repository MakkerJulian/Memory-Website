import { Injectable } from "@angular/core";
import { JTWType } from "../types/JTWType";

@Injectable({ providedIn: 'root' })
export class JWTService {
    parseJwt(token: string): JTWType {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }

    checkJTW(): boolean {
        const token = localStorage.getItem('memoryToken');
        if (!token) {
            return false;
        }
        const jwt = this.parseJwt(token);
        const exp = jwt.exp;
        if (Date.now() >= exp * 1000) return false;
        return true;
    }

}