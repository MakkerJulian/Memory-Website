import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FullGame } from '../../types/gameType';

@Component({
  selector: 'app-game-card',
  standalone: true,
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.css'
})
export class GameCardComponent {
  @Input()
  game!: FullGame;
  @Output() detailsClicked = new EventEmitter<FullGame>();

  viewDetails() {
    this.detailsClicked.emit(this.game);
  }
}
