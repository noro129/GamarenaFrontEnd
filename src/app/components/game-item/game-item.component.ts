import { LowerCasePipe, NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-game-item',
  imports: [NgClass, RouterLink, LowerCasePipe],
  templateUrl: './game-item.component.html',
  styleUrl: './game-item.component.scss'
})
export class GameItemComponent {

  @Input() gameName!: string;
  @Input() gameLikesNumber!: number;
  @Input() gamePlayersNumber!: number;
  @Input() gameDescription!: string;
  @Input() isGameLiked!: boolean;

  hoverEffect = false;
  likeButtonPressed = false;


  likePressed() {
    this.isGameLiked = !this.isGameLiked;
    if (this.isGameLiked) this.likeButtonPressed = true;
    else this.likeButtonPressed = false;
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

  triggerHoverEffect(bool : boolean) {
    this.hoverEffect = bool;
  }
}
