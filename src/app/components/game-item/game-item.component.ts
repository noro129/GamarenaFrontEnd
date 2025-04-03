import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-item',
  imports: [NgClass],
  templateUrl: './game-item.component.html',
  styleUrl: './game-item.component.scss'
})
export class GameItemComponent {

  @Input() gameName!: string;
  @Input() gameLikesNumber!: number;
  @Input() gamePlayersNumber!: number;
  @Input() gameDescription!: string;
  @Input() isGameLiked!: boolean;


  likePressed() {
    this.isGameLiked = !this.isGameLiked;
  }
  getGameImage(gameName: string) : string {
    switch (gameName.toLowerCase()) {
      case 'worduess' : return 'gamesLogo/worduess.png';
      case 'sudoku' : return 'gamesLogo/sudoku.png';
      case 'twinHunt' : return 'gamesLogo/twinHunt.png';
      case '2048' : return 'gamesLogo/2048.png';
      default : return '';
    }
  }
}
