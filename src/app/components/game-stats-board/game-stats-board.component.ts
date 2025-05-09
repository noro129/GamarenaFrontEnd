import { NgClass, NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { GameStat } from '../../models/GameStat';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-stats-board',
  imports: [NgFor, NgClass],
  templateUrl: './game-stats-board.component.html',
  styleUrl: './game-stats-board.component.scss'
})
export class GameStatsBoardComponent implements OnInit{
  @Input() gameName!: string;
  @Input() position: string = 'right';
  order!: number[];


  header = "Game Stats";
  globalStats: boolean = true;
  gameStats!: GameStat[];

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.getGlobalGameStats();
  }

  getGlobalGameStats() {
    this.gameService.getGameStats(this.gameName, true).subscribe({
      next: (response) => {
        this.gameStats = response;
        this.order = [1];
        for(let i=1; i<this.gameStats.length; i++) {
          if(this.gameStats[i-1].minutes === this.gameStats[i].minutes && this.gameStats[i-1].seconds === this.gameStats[i].seconds) this.order[i] = this.order[i-1];
          else this.order[i] = this.order.length + 1;
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  switchStats(toGlobal : boolean) {
    this.globalStats = toGlobal;
  }
}
