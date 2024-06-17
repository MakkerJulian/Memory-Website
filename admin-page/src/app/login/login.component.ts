import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { JTWResponse } from '../../types/JTWType';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private http: HttpClient) { }
  username: string = '';
  password: string = '';
  
  loginUser = () => {
    this.http.post<JTWResponse>('http://localhost:8000/api/login_check', {
      username: this.username,
      password: this.password
    }).subscribe((data) => {
      localStorage.setItem('memoryToken', data.token);
      window.location.href = './home';
    });
  }
}
