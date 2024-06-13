import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Player } from '../../types/playerType';
import { AdminService } from '../../services/Admin.service';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './players.component.html',
  styleUrl: './players.component.css'
})
export class PlayersComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}
  players: Player[] = [];
  filterPlayers: Player[] = [];

  async ngOnInit() {
    const playersObservable = await this.adminService.getPlayers();
    playersObservable.subscribe(players => {
      this.players = players;
      this.filterPlayers = players;
    });
  }

  set searchText(value: string) {
    this.filterPlayers = this.players.filter(player => player.username.startsWith(value));
  }

  openSnackBar(message: string, action: string) :void {
    this._snackBar.open(message, action);
  }

  goHome() {
    this.router.navigate(['/home']);
  }

}