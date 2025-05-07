import { NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { GameResultComponent } from "../../../../components/game-result/game-result.component";
import { delay } from 'rxjs';

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
  board = [[0,0,0,0],[0,0,0,4],[0,0,2,0],[0,2,0,2]];


  constructor(private renderer : Renderer2) {}

  toArray(size : number) : number[]{
    return Array.from({length: size}, (_, i) => i);
  }

  @HostListener('window:keyup', ['$event'])
  async arrowKey(event : KeyboardEvent) {
    if(!this.canPush) {
      console.log('cannot push yet!!!');
      return;
    }
    this.canPush=false;
    let moved = false;
    if(event.key === 'ArrowUp') {
      moved = await this.pushUp();
    }
    else if(event.key === 'ArrowDown') {
      moved = await this.pushDown();
    }
    else if(event.key === 'ArrowLeft') {
      moved = await this.pushLeft();
    }
    else if(event.key === 'ArrowRight') {
      moved = await this.pushRight();
    }

    if (moved) {
      await new Promise(requestAnimationFrame);
      this.addNewBlock();
    }
    this.canPush= true;
  }

  async pushUp() : Promise<boolean> {
    let moves = [];
    for(let column=0; column<this.boardY; column++) {
      let blankBlocks = 0;
      for(let row=0; row<this.boardX; row++) {
        const value = this.board[row][column];
        if (value === 0) blankBlocks++;
        else if (blankBlocks > 0) {
          moves.push({
            'row': row,
            'column': column,
            'pushBy': blankBlocks
          })
        }
      }
    }
    if(moves.length === 0) return false;
    let promises = [];
    for(const move of moves) {
      const promise = this.pushBlockUpBy(move.row, move.column, move.pushBy);
      promises.push(promise);
    }
    await Promise.all(promises).then(()=>{
      for(const move of moves){
        this.pushBoardCellUpBy(move.row, move.column, move.pushBy);
      }
    });
    return true;
  }

  async pushDown() : Promise<boolean> {
    let moves = [];
    for(let column=0; column<this.boardY; column++) {
      let blankBlocks = 0;
      for(let row=this.boardX-1; row>=0; row--) {
        const value = this.board[row][column];
        if(value === 0) blankBlocks++;
        else if (blankBlocks > 0) {
          moves.push({
            'row': row,
            'column': column,
            'pushBy': blankBlocks
          })
          
        }
      }
    }
    if(moves.length === 0) return false;
    let promises = [];
    for(const move of moves) {
      const promise = this.pushBlockDownBy(move.row, move.column, move.pushBy);
      promises.push(promise);
    }
    await Promise.all(promises).then(()=>{
      for(const move of moves) {
        this.pushBoardCellDownBy(move.row, move.column, move.pushBy);
      }
    });
    return true;
  }

  async pushLeft() : Promise<boolean> {
    let moves = [];
    for(let row=0; row<this.boardX; row++) {
      let blankBlocks = 0;
      for(let column=0; column<this.boardY; column++) {
        if(this.board[row][column] === 0) blankBlocks++;
        else if (blankBlocks > 0) {
          moves.push({
            'row': row,
            'column': column,
            'pushBy': blankBlocks
          })
          
        }
      }
      
    }
    if(moves.length === 0) return false;
    let promises = [];
    for(const move of moves) {
      const promise = this.pushBlockLeftBy(move.row, move.column, move.pushBy);
      promises.push(promise);
    }
    await Promise.all(promises).then(()=>{
      for(const move of moves) {
        this.pushBoardCellLeftBy(move.row, move.column, move.pushBy);
      }
    });
    return true;
  }

  async pushRight() : Promise<boolean> {
    let moves = [];
    for(let row=0; row<this.boardX; row++) {
      let blankBlocks = 0;
      for(let column=this.boardY-1; column>=0; column--) {
        if (this.board[row][column] === 0) blankBlocks++;
        else if (blankBlocks > 0) {
          moves.push({
            'row': row,
            'column': column,
            'pushBy': blankBlocks
          })
          
        }
      }
    }
    if(moves.length === 0) return false;
    let promises = [];
    for(const move of moves) {
      const promise = this.pushBlockRightBy(move.row, move.column, move.pushBy);
      promises.push(promise);
    }
    await Promise.all(promises).then(()=>{
      for(const move of moves) {
        this.pushBoardCellRightBy(move.row, move.column, move.pushBy);
      }
    });
    return true;
  }

  ///////////////////////////////// MODIFY THE FOLLOWING METHODS TO ADD MERGING CASES /////////////////////////////////

  async pushBlockUpBy(row : number, column : number, pushBy : number) {
    if (pushBy === 0 || row<0 || row>=this.boardX || column<0 || column>=this.boardY) return;

    const boardNumber = this.getNumberElement(row, column);
    this.renderer.setStyle(boardNumber, 'transform', `translateY(${- pushBy * 90}px)`);    
    await this.waitForTransitionAnimationEnd(boardNumber);
  }
  
  async pushBoardCellUpBy(row : number, column : number, pushBy : number) {
    await new Promise(requestAnimationFrame);
    const temp = this.board[row][column];
    this.board[row][column] = 0;
    this.board[row-pushBy][column] = temp;
  }

  async pushBlockDownBy(row : number, column : number, pushBy : number) {
    if (pushBy === 0 || row<0 || row>=this.boardX || column<0 || column>=this.boardY) return;
    const boardNumber = this.getNumberElement(row, column);
    this.renderer.setStyle(boardNumber, 'transform', `translateY(${pushBy * 90}px)`);

    await this.waitForTransitionAnimationEnd(boardNumber);
  }

  async pushBoardCellDownBy(row : number, column : number, pushBy : number) {
    await new Promise(requestAnimationFrame);
    const temp = this.board[row][column];
    this.board[row][column] = 0;
    this.board[row+pushBy][column] = temp;
  }

  async pushBlockLeftBy(row : number, column : number, pushBy : number) {
    if (pushBy === 0 || row<0 || row>=this.boardX || column<0 || column>=this.boardY) return;
    const boardNumber = this.getNumberElement(row, column);
    this.renderer.setStyle(boardNumber, 'transform', `translateX(${-pushBy * 90}px)`);

    await this.waitForTransitionAnimationEnd(boardNumber);
  }

  async pushBoardCellLeftBy(row : number, column : number, pushBy : number) {
    await new Promise(requestAnimationFrame);
    const temp = this.board[row][column];
    this.board[row][column] = 0;
    this.board[row][column-pushBy] = temp;
  }

  async pushBlockRightBy(row : number, column : number, pushBy : number) {
    if (pushBy === 0 || row<0 || row>=this.boardX || column<0 || column>=this.boardY) return;

    const boardNumber = this.getNumberElement(row, column);

    this.renderer.setStyle(boardNumber, 'transform', `translateX(${pushBy * 90}px)`);

    await this.waitForTransitionAnimationEnd(boardNumber);
  }

  async pushBoardCellRightBy(row : number, column : number, pushBy : number) {
    await new Promise(requestAnimationFrame);
    const temp = this.board[row][column];
    this.board[row][column] = 0;
    this.board[row][column+pushBy] = temp;
  }

  //////////////////////////////////////////// CROSS CUTTING CONCERNS:
  getNumberElement(row : number, column : number) : HTMLElement {
    let boardRow = this.boardMatrix.nativeElement.querySelectorAll(".row")[row];
    let boardBlock = boardRow.querySelectorAll(".block")[column];
    let boardNumber = boardBlock.querySelectorAll(".number");
    return boardNumber[0];
  }

  getBlockElement(row: number, column: number) : HTMLElement {
    let boardRow = this.boardMatrix.nativeElement.querySelectorAll(".row")[row];
    return boardRow.querySelectorAll(".block")[column];
  }

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

  async waitForTransitionAnimationEnd(element : HTMLElement) : Promise<void> {
    return new Promise(resolve => {
      const handler = (event : TransitionEvent) => {
        if (event.target === element) {
          element.removeEventListener('transitionend', handler);
          this.renderer.removeStyle(element, 'transform');
          resolve();
        }
      }
      element.addEventListener('transitionend', handler);
    })
  }
}
