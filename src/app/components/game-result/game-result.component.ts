import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-result',
  imports: [NgClass, NgIf, NgFor, RouterLink],
  templateUrl: './game-result.component.html',
  styleUrl: './game-result.component.scss'
})
export class GameResultComponent implements OnChanges {
  @Input() gameName: string = '';
  @Input() isVisible: boolean = false;
  @Input() isSuccess: boolean = true;

  constructor(private gameService: GameService) {}


  hide() {
    this.isVisible= false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['isVisible'] && changes['isVisible'].currentValue){
      this.gameService.setGameResult(this.gameName, this.isSuccess, 0, 0).subscribe({
        next: (response) => {
          if(response) console.log('successfully set game result.');
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }
}
