import { NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { GameResultComponent } from "../../../../components/game-result/game-result.component";

@Component({
  selector: 'app-twenty-fourty-eight',
  imports: [NgFor, NgIf, GameResultComponent],
  templateUrl: './twenty-fourty-eight.component.html',
  styleUrl: './twenty-fourty-eight.component.scss'
})
export class TwentyFourtyEightComponent {
  gameName = '2048'
  startGame = false;
  gameEnded = false;
  canPush = true;
  maxBlock = 2;
  @ViewChild("boardMatrix") boardMatrix!: ElementRef;



  boardX = 4;
  boardY = 4;
  board = [[0,0,0,0],[0,0,0,4],[0,0,2,0],[0,2,0,2]]


  constructor(private renderer : Renderer2) {}

  toArray(size : number) : number[]{
    return Array.from({length: size}, (_, i) => i);
  }

  @HostListener('window:keyup', ['$event'])
  arrowKey(event : KeyboardEvent) {
    if(!this.canPush) return;
    if(event.key === 'ArrowUp') {
      if(this.pushUp()) {
        this.canPush = false;
      }
    }
    if(event.key === 'ArrowDown') {
      if(this.pushDown()) {
        this.canPush = false;
      }
    }
    if(event.key === 'ArrowLeft') {
      if(this.pushLeft()) {
        this.canPush = false;
      }
    }
    if(event.key === 'ArrowRight') {
      if(this.pushRight()) {
        this.canPush = false;
      }
    }
    setTimeout(()=>{this.canPush = true;this.addNewBlock();}, 300)
  }

  pushUp() : boolean {
    for(let column=0; column<this.boardY; column++) {
      let blankBlocks = 0;
      for(let row=0; row<this.boardX; row++) {
        if(this.board[row][column] === 0) blankBlocks++;
        else this.pushBlockUpBy(row, column, blankBlocks);
      }
      if (blankBlocks===4 || blankBlocks===0) continue;
    }
    return true;
  };

  pushDown() : boolean {
    for(let column=0; column<this.boardY; column++) {
      let blankBlocks = 0;
      for(let row=this.boardX-1; row>=0; row--) {
        if(this.board[row][column] === 0) blankBlocks++;
        else this.pushBlockDownBy(row, column, blankBlocks);
      }
      if (blankBlocks===4 || blankBlocks===0) continue;
    }
    return true;
  };

  pushLeft() : boolean {
    for(let row=0; row<this.boardX; row++) {
      let blankBlocks = 0;
      for(let column=0; column<this.boardY; column++) {
        if(this.board[row][column] === 0) blankBlocks++;
        else this.pushBlockLeftBy(row, column, blankBlocks);
      }
      if (blankBlocks===4 || blankBlocks===0) continue;
    }
    return true;
  };

  pushRight() : boolean {
    for(let row=0; row<this.boardX; row++) {
      let blankBlocks = 0;
      for(let column=this.boardY-1; column>=0; column--) {
        if(this.board[row][column] === 0) blankBlocks++;
        else this.pushBlockRightBy(row, column, blankBlocks);
      }
      if (blankBlocks===4 || blankBlocks===0) continue;
    }
    return true;
  };

  
  addNewBlock() {
    let cells = [];
    for(let row=0; row<this.boardX; row++) {
      for(let column=0; column<this.boardY; column++) {
        if (this.board[row][column]===0) cells.push([row, column]);
      }
    }
    if (cells.length === 0) {
      this.gameEnded = true;
      return;
    }
    const cell = Math.floor(Math.random()*cells.length);
    this.board[cells[cell][0]][cells[cell][1]] = Math.floor(Math.random() * 10) === 5 ? 4 : 2;
  }

  //////////////////////////////////////// MODIFY THE FOLLOWING METHODS TO ADD MERGING CASES /////////////////////////////////

  pushBlockUpBy(row : number, column : number, pushBy : number) {
    if (pushBy === 0 || row<0 || row>=this.boardX || column<0 || column>=this.boardY) return;

    const boardNumber = this.getNumberElement(row, column);

    this.renderer.setStyle(boardNumber, 'transform', 'translateY(-'+(pushBy * 90)+'px)');
    setTimeout(() => {
      this.pushBoardCellUpBy(row, column, pushBy);
    }, 200);
  }

  pushBoardCellUpBy(row : number, column : number, pushBy : number) {
    const temp = this.board[row][column];
    this.board[row][column] = 0;
    this.board[row-pushBy][column] = temp;
  }

  pushBlockDownBy(row : number, column : number, pushBy : number) {
    if (pushBy === 0 || row<0 || row>=this.boardX || column<0 || column>=this.boardY) return;

    const boardNumber = this.getNumberElement(row, column);
    
    this.renderer.setStyle(boardNumber, 'transform', 'translateY('+(pushBy * 90)+'px)');
    setTimeout(() => {
      this.pushBoardCellDownBy(row, column, pushBy);
    }, 200);
  }

  pushBoardCellDownBy(row : number, column : number, pushBy : number) {
    const temp = this.board[row][column];
    this.board[row][column] = 0;
    this.board[row+pushBy][column] = temp;
  }

  pushBlockLeftBy(row : number, column : number, pushBy : number) {
    if (pushBy === 0 || row<0 || row>=this.boardX || column<0 || column>=this.boardY) return;

    const boardNumber = this.getNumberElement(row, column);

    this.renderer.setStyle(boardNumber, 'transform', 'translateX(-'+(pushBy * 90)+'px)');
    setTimeout(() => {
      this.pushBoardCellLeftBy(row, column, pushBy);
    }, 200);
  }

  pushBoardCellLeftBy(row : number, column : number, pushBy : number) {
    const temp = this.board[row][column];
    this.board[row][column] = 0;
    this.board[row][column-pushBy] = temp;
  }

  pushBlockRightBy(row : number, column : number, pushBy : number) {
    if (pushBy === 0 || row<0 || row>=this.boardX || column<0 || column>=this.boardY) return;

    const boardNumber = this.getNumberElement(row, column);

    this.renderer.setStyle(boardNumber, 'transform', 'translateX('+(pushBy * 90)+'px)');
    setTimeout(() => {
      this.pushBoardCellRightBy(row, column, pushBy);
    }, 200);
  }

  pushBoardCellRightBy(row : number, column : number, pushBy : number) {
    const temp = this.board[row][column];
    this.board[row][column] = 0;
    this.board[row][column+pushBy] = temp;
  }

  getNumberElement(row : number, column : number) : ElementRef {
    let boardRow = this.boardMatrix.nativeElement.querySelectorAll(".row")[row];
    let boardBlock = boardRow.querySelectorAll(".block")[column];
    let boardNumber = boardBlock.querySelectorAll(".number");
    return boardNumber[0];
  }
}
