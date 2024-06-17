import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../../services/Game.Service';
import { FullGame, Game } from '../../types/gameType';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-general',
  standalone: true,
  imports: [NgFor],
  templateUrl: './general.component.html',
  styleUrl: './general.component.css'
})
export class GeneralComponent implements OnInit {
  constructor(
    private router: Router,
    private gameService: GameService,
    private snackbar: MatSnackBar
  ) { }
  games: FullGame[] = [];
  gamescount = this.games.length;
  favAPI = '';

  goHome() {
    this.router.navigate(['/home']);
  }
  ngOnInit(): void {
    this.gameService.getAll().subscribe((games) => {
      this.games = games;
      this.gamescount = this.games.length;
      const favMap = new Map<string, number>();
      this.games.forEach((game) => {
        if(game.api === "")return;
        if (favMap.has(game.api)) {
          favMap.set(game.api, favMap.get(game.api) as number + 1);
        } else {
          favMap.set(game.api, 1);
        }
      });
      this.favAPI = [...favMap.entries()].reduce((a, e) => (e[1] > a[1] ? e : a))[0];
    });
  }

  openSnackBar(game: FullGame, action: string) {
    const message = `Game played on ${game.day} with a score of ${game.score}
    the API used was ${game.api},  and with card settings: Closed: ${game.color_closed}, 
    Found: ${game.color_found}.`;
    this.snackbar.open(message, action);
  }
}
