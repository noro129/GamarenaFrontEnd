import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MinesweeperService } from '../minesweeper.service';

@Component({
  selector: 'app-minesweeper',
  imports: [NgFor, NgClass, NgIf],
  templateUrl: './minesweeper.component.html',
  styleUrl: './minesweeper.component.scss'
})
export class MinesweeperComponent implements OnInit {
  gameName = "Minesweeper";
  startGame = false;
  gameOver = false;

  minesMatrix!: number[][];
  minesClicked!: boolean[][];
  rows = 16;
  columns = 16;
  flagMode = false;
  showMode = true;
  flaggedBlocks = 0;
  remainingBlocks = this.rows*this.columns;
  virusNumber = 40;

  @ViewChild('faceEmoji') faceEmoji!: ElementRef<HTMLImageElement>;

  private interval : any;


  constructor(private minesweeperService : MinesweeperService) {
    this.minesweeperService.initializeGame(this.rows, this.columns).subscribe({
      next: (response) => {
        console.log(response);
        this.minesMatrix = response;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }


  ngOnInit(): void {
    this.minesClicked = [];

    for(let row=0; row<this.rows; row++){
      this.minesClicked[row] = [];
      for(let column=0; column<this.columns; column++) {
        this.minesClicked[row][column] = false;
      }
    }

    

  }

  handleGameStart(){
    
    this.startGame = true;
    this.interval = setInterval(()=>{
      this.faceEmoji.nativeElement.src = "icon/minesweeper-HappyFace-closedEyes.png";
      setTimeout(()=>{
        this.faceEmoji.nativeElement.src = "icon/minesweeper-HappyFace.png";
      },100)
    }, 2000)
  }

  indexesArray(size : number) {
    return Array.from({length: size}, (_, i) => i);
  }

  uncoverBlock(row : number, column : number, clicked : boolean) {
    if (!this.startGame || row<0 || row>=this.rows || column<0 || column>=this.columns || this.minesClicked[row][column]) return;

    if(clicked && this.minesMatrix[row][column]===-1) {
      this.gameOver= true;
      this.minesClicked[row][column] = true;
      clearInterval(this.interval);
      return;
    }
    if(clicked || this.minesMatrix[row][column]===0) {
      this.minesClicked[row][column] = true;
      this.remainingBlocks--;
      setTimeout(()=>{

        this.uncoverBlock(row-1, column, false);
        this.uncoverBlock(row+1, column, false);
        this.uncoverBlock(row, column-1, false);
        this.uncoverBlock(row, column+1, false);
        this.uncoverBlock(row-1, column-1, false);
        this.uncoverBlock(row+1, column-1, false);
        this.uncoverBlock(row-1, column+1, false);
        this.uncoverBlock(row+1, column+1, false);
      },100)
      
      
    }
    if(!clicked && this.minesMatrix[row][column]>0) {
      this.minesClicked[row][column] = true;
      this.remainingBlocks--;
    }
  }

}
