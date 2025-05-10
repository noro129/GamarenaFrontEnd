import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { GameStat } from '../../models/GameStat';
import { GameService } from '../../services/game.service';
import { UserGameStat } from '../../models/UserGameStat';

@Component({
  selector: 'app-game-stats-board',
  imports: [NgIf ,NgFor, NgClass, NgStyle],
  templateUrl: './game-stats-board.component.html',
  styleUrl: './game-stats-board.component.scss'
})
export class GameStatsBoardComponent implements OnInit{
  @Input() gameName!: string;
  @Input() position: string = 'right';
  @Input() hints = 2;
  @ViewChild('hintSelector') hintSelector!: ElementRef;
  order!: number[];


  header = "Game Stats";
  globalStats: boolean = true;
  gameStats!: GameStat[];
  userGameStats!: UserGameStat[];

  constructor(private gameService: GameService, private renderer : Renderer2) {}

  ngOnInit(): void {
    this.getGlobalGameStats(0);
  }

  toArray(size : number) {
    return Array.from({length:size}, (_, i) => i);
  }

  getGlobalGameStats(hints: number) {
    this.gameService.getGameStats(this.gameName, hints).subscribe({
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

  getUserGameStats(){
    this.gameService.getUserGameStats(this.gameName).subscribe({
      next: (response) => {
        this.userGameStats = response;
        this.order = [1];
        for(let i=1; i<this.userGameStats.length; i++) {
          if(this.userGameStats[i-1].minutes === this.userGameStats[i].minutes && this.userGameStats[i-1].seconds === this.userGameStats[i].seconds) this.order[i] = this.order[i-1];
          else this.order[i] = this.order.length + 1;
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  switchStats(toGlobal : boolean) {
    if (this.globalStats === toGlobal) return;
    this.globalStats = toGlobal;
    if(this.globalStats) this.getGlobalGameStats(0);
    else this.getUserGameStats();
  }

  selectHint(hint: number) {
    const hintItemSelector = this.hintSelector.nativeElement;
    this.renderer.setStyle(hintItemSelector, 'transform', `translateX(${(hint - this.hints)*22}px)`);
    this.getGlobalGameStats(hint);
  }
}
