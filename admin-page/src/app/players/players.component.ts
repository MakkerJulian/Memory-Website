import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PlayerWithScore } from '../../types/playerType';
import { AdminService } from '../../services/Admin.service';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DefaultService } from '../../services/Default.service';
import { Score } from '../../types/scoreType';

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
    private defaultService: DefaultService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}
  players: PlayerWithScore[] = [];
  filterPlayers: PlayerWithScore[] = [];
  scores: Score[] = [];

  async ngOnInit() {
    this.defaultService.getScores().subscribe(scores => {
      this.scores = scores;
    });
    this.adminService.getPlayers().subscribe(players => {
      const playersWithScore = players.map(player => {
        const score = this.scores.find(score => score.username === player.username);
        return {
          ...player,
          score: score ? score.score : 0
        };
      });
      this.players = playersWithScore;
      this.filterPlayers = playersWithScore;
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