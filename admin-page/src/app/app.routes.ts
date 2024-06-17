import { Routes } from '@angular/router';
import { PlayersComponent } from './players/players.component';
import { HomeComponent } from './home/home.component';
import { GeneralComponent } from './general/general.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'players', component: PlayersComponent },
    { path: 'home', component: HomeComponent },
    { path: 'general', component: GeneralComponent},
    { path: 'login', component: LoginComponent}
];
