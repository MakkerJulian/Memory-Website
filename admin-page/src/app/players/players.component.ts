import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Player } from '../../types/playerType';
import { AdminService } from '../../services/Admin.service';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [NgFor],
  templateUrl: './players.component.html',
  styleUrl: './players.component.css'
})
export class PlayersComponent implements OnInit {
  constructor(private adminService: AdminService) {
  }
  players: Player[] = [];

  async ngOnInit() {
    this.players.push({ username: 'test', email: 'test' })
    const playersObservable = await this.adminService.getPlayers();
    playersObservable.subscribe(players => {
      this.players = players;
    });
  }
}