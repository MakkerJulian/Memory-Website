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
    if(window.location.href.includes('login')) return true;
    if(!this.jwtService.checkJTW()) {
      window.location.href = './login';
    }
    return true;
  }
}
