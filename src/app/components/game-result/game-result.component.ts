import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GameService } from '../../services/game.service';
import { DataShareService } from '../../services/data-share.service';

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

  constructor(private gameService: GameService, private dataShareService : DataShareService) {}


  hide() {
    this.isVisible= false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['isVisible'] && changes['isVisible'].currentValue){
      let minutes = 0;
      let seconds = 0;
      if(this.isSuccess) {
          this.dataShareService.currentData$.subscribe(data => {
          if(data) {
            minutes = data.minutes;
            seconds = data.seconds;
          }
        })
      }
      this.gameService.setGameResult(this.gameName, this.isSuccess, minutes, seconds).subscribe({
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
