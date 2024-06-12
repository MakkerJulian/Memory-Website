import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { JWTService } from '../services/JWT.service';
import { HttpClient } from '@angular/common/http';
import { JTWResponse } from '../types/JTWType';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf],
  providers: [JWTService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'admin-page';

  constructor(private jwtService: JWTService, private http: HttpClient) { }

  valid() {
    if(typeof window === 'undefined') return false;
    if(!this.jwtService.checkJTW()) {
      this.http.post<JTWResponse>('http://localhost:8000/api/login_check', {
        username: 'Henk',
        password: 'henk'
      }).subscribe((data) => {
        localStorage.setItem('memoryToken', data.token);
      });
    }
    return true;
  }
}
