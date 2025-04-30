import { LowerCasePipe, NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-item',
  imports: [NgIf, NgClass, RouterLink, LowerCasePipe],
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

  constructor(private gameService : GameService) {}

  likePressed() {
    this.isGameLiked = !this.isGameLiked;
    this.gameService.gameReaction(this.gameName, this.isGameLiked).subscribe();
    if (this.isGameLiked) {
      this.likeButtonPressed = true;
      this.gameLikesNumber++;
    }
    else {
      this.likeButtonPressed = false;
      this.gameLikesNumber--;
    }
  }
  getGameImage(gameName: string) : string {
    switch (gameName.toLowerCase()) {
      case 'worduess' : return 'gamesLogo/worduess.png';
      case 'sudoku' : return 'gamesLogo/sudoku.png';
      case 'twins-hunt' : return 'gamesLogo/twins-hunt.png';
      case '2048' : return 'gamesLogo/2048.png';
      case 'snake' : return 'gamesLogo/snake.png';
      case 'minesweeper' : return 'gamesLogo/minesweeper.png';
      default : return '';
    }
  }

  triggerHoverEffect(bool : boolean) {
    this.hoverEffect = bool;
  }
}
