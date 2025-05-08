import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { GameResultComponent } from "../../../../components/game-result/game-result.component";
import { delay } from 'rxjs';
import { GameToolbarComponent } from "../../../../components/game-toolbar/game-toolbar.component";
import { TimerComponent } from "../../../../components/timer/timer.component";

@Component({
  selector: 'app-twenty-fourty-eight',
  imports: [NgFor, NgIf, NgClass, NgStyle, GameResultComponent, GameToolbarComponent, TimerComponent],
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
  board = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];


  constructor(private renderer : Renderer2) {}

  handleGameStart(event : boolean) {
    this.startGame = true;
    this.addNewBlock();
  }

  toArray(size : number) : number[]{
    return Array.from({length: size}, (_, i) => i);
  }

  @HostListener('window:keyup', ['$event'])
  async arrowKey(event : KeyboardEvent) {
    if(!this.startGame || !this.canPush) {
      return;
    }
    this.canPush=false;
    let moved = false;
    if(event.key === 'ArrowUp') {
      if(await this.pushUp()) moved = true;
      await new Promise(requestAnimationFrame);
      if(await this.mergeUp()) moved = true;
      await new Promise(requestAnimationFrame);
      if(await this.pushUp()) moved = true;
    }
    else if(event.key === 'ArrowDown') {
      if(await this.pushDown()) moved = true;
      await new Promise(requestAnimationFrame);
      if(await this.mergeDown()) moved = true;
      await new Promise(requestAnimationFrame);
      if(await this.pushDown()) moved = true;
    }
    else if(event.key === 'ArrowLeft') {
      if(await this.pushLeft()) moved = true;
      await new Promise(requestAnimationFrame);
      if(await this.mergeLeft()) moved = true;
      await new Promise(requestAnimationFrame);
      if(await this.pushLeft()) moved = true;
    }
    else if(event.key === 'ArrowRight') {
      if(await this.pushRight()) moved = true;
      await new Promise(requestAnimationFrame);
      if(await this.mergeRight()) moved = true;
      await new Promise(requestAnimationFrame);
      if(await this.pushRight()) moved = true;
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

  async mergeUp() : Promise<boolean> {
    let moves = [];
    for (let column=0; column<this.boardY; column++) {
      for(let row=0; row<this.boardX; row++){
        if (this.board[row][column]===0) break;
        if(row>0 && moves.length!==0 && !moves[moves.length-1].merge && this.board[row][column]==this.board[row-1][column]) {
          moves[moves.length-1].merge = true;
          moves.push({
            'row': row,
            'column': column,
            'merge': true
          })
        } else {
          moves.push({
            'row': row,
            'column': column,
            'merge': false
          })
        }
      }
    }
    moves = moves.filter(move => move.merge);
    if(moves.length === 0) return false;
    let promises = [];
    for(let move=0; move<moves.length; move+=2) {
      const promise = this.mergeTwoBlocksUp(moves[move].row, moves[move].column);
      promises.push(promise);
    }

    await Promise.all(promises);
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

  async mergeDown() : Promise<boolean> {
    let moves = [];
    for (let column=0; column<this.boardY; column++) {
      for(let row=this.boardX-1; row>=0; row--){
        if (this.board[row][column]===0) break;
        if(row<this.boardX-1 && moves.length!==0 && !moves[moves.length-1].merge && this.board[row][column]==this.board[row+1][column]) {
          moves[moves.length-1].merge = true;
          moves.push({
            'row': row,
            'column': column,
            'merge': true
          })
        } else {
          moves.push({
            'row': row,
            'column': column,
            'merge': false
          })
        }
      }
    }
    moves = moves.filter(move => move.merge);
    if(moves.length === 0) return false;
    let promises = [];
    for(let move=0; move<moves.length; move+=2) {
      const promise = this.mergeTwoBlocksDown(moves[move].row, moves[move].column);
      promises.push(promise);
    }
    await Promise.all(promises);
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

  async mergeLeft() : Promise<boolean> {
    let moves = [];
    for (let row=0; row<this.boardX; row++) {
      for(let column=0; column<this.boardY; column++){
        if (this.board[row][column]===0) break;
        if(column>0 && moves.length!==0 && !moves[moves.length-1].merge && this.board[row][column]==this.board[row][column-1]) {
          moves[moves.length-1].merge = true;
          moves.push({
            'row': row,
            'column': column,
            'merge': true
          })
        } else {
          moves.push({
            'row': row,
            'column': column,
            'merge': false
          })
        }
      }
    }
    moves = moves.filter(move => move.merge);
    if(moves.length === 0) return false;
    let promises = [];
    for(let move=0; move<moves.length; move+=2) {
      const promise = this.mergeTwoBlocksLeft(moves[move].row, moves[move].column);
      promises.push(promise);
    }
    await Promise.all(promises);
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

  async mergeRight() : Promise<boolean> {
    let moves = [];
    for (let row=0; row<this.boardX; row++) {
      for(let column=this.boardY-1; column>=0; column--){
        if (this.board[row][column]===0) break;
        if(column<this.boardY-1 && moves.length!==0 && !moves[moves.length-1].merge && this.board[row][column]==this.board[row][column+1]) {
          moves[moves.length-1].merge = true;
          moves.push({
            'row': row,
            'column': column,
            'merge': true
          })
        } else {
          moves.push({
            'row': row,
            'column': column,
            'merge': false
          })
        }
      }
    }
    moves = moves.filter(move => move.merge);
    if(moves.length === 0) return false;
    let promises = [];
    for(let move=0; move<moves.length; move+=2) {
      const promise = this.mergeTwoBlocksRight(moves[move].row, moves[move].column);
      promises.push(promise);
    }
    await Promise.all(promises);
    return true;
  }

  ///////////////////////////////// PUSHING BLOCKS METHODS /////////////////////////////////

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

  ///////////////////////////////// MERGING BLOCKS METHODS /////////////////////////////////

  async mergeTwoBlocksUp(row: number, column: number) {
    const lowerBoardNumber = this.getNumberElement(row+1, column);


    const timesTwoElement = this.renderer.createElement('span');
    const mergeInBlock = this.getBlockElement(row, column);
    
    this.renderer.addClass(timesTwoElement, 'number');
    this.renderer.setStyle(timesTwoElement, 'z-index', '9990');
    this.renderer.setStyle(timesTwoElement, 'color', this.getBackgroundColorForNubmber(this.board[row][column]));
    this.renderer.setStyle(timesTwoElement, 'background-color', 'white');
    this.renderer.setStyle(timesTwoElement, 'opacity', '0');
    this.renderer.setStyle(timesTwoElement, 'transform', 'translateY(-100%)');
    this.renderer.setProperty(timesTwoElement, 'innerText', 'x2');
    this.renderer.setStyle(timesTwoElement, 'transition', 'all .4s cubic-bezier(0.1, 0.9, 0.1, 1)');
    this.renderer.appendChild(mergeInBlock, timesTwoElement);

    await new Promise(requestAnimationFrame);

    this.renderer.setStyle(lowerBoardNumber, 'transform', 'translateY(-90px)');

    await this.waitForTransitionAnimationEnd(lowerBoardNumber);

    this.board[row+1][column] = 0;
    await new Promise(requestAnimationFrame);

    this.renderer.setStyle(timesTwoElement, 'opacity', '1');
    this.renderer.setStyle(timesTwoElement, 'transform', 'translateY(-75px)');
    this.renderer.setStyle(timesTwoElement, 'scale', '1.1');

    await this.waitForTransitionAnimationEnd(timesTwoElement);
    
    this.board[row][column] *= 2;
    this.maxBlock = Math.max(this.maxBlock, this.board[row][column]);
    this.renderer.removeChild(mergeInBlock, timesTwoElement);

    await new Promise(requestAnimationFrame);
  }

  async mergeTwoBlocksDown(row: number, column: number) {
    const upperBoardNumber = this.getNumberElement(row-1, column);


    const timesTwoElement = this.renderer.createElement('span');
    const mergeInBlock = this.getBlockElement(row, column);
    
    this.renderer.addClass(timesTwoElement, 'number');
    this.renderer.setStyle(timesTwoElement, 'z-index', '9990');
    this.renderer.setStyle(timesTwoElement, 'color', this.getBackgroundColorForNubmber(this.board[row][column]));
    this.renderer.setStyle(timesTwoElement, 'background-color', 'white');
    this.renderer.setStyle(timesTwoElement, 'opacity', '0');
    this.renderer.setStyle(timesTwoElement, 'transform', 'translateY(-100%)');
    this.renderer.setProperty(timesTwoElement, 'innerText', 'x2');
    this.renderer.setStyle(timesTwoElement, 'transition', 'all .4s cubic-bezier(0.1, 0.9, 0.1, 1)');
    this.renderer.appendChild(mergeInBlock, timesTwoElement);

    await new Promise(requestAnimationFrame);

    this.renderer.setStyle(upperBoardNumber, 'transform', 'translateY(90px)');

    await this.waitForTransitionAnimationEnd(upperBoardNumber);

    this.board[row-1][column] = 0;
    this.maxBlock = Math.max(this.maxBlock, this.board[row][column]);
    await new Promise(requestAnimationFrame);

    this.renderer.setStyle(timesTwoElement, 'opacity', '1');
    this.renderer.setStyle(timesTwoElement, 'transform', 'translateY(-75px)');
    this.renderer.setStyle(timesTwoElement, 'scale', '1.1');

    await this.waitForTransitionAnimationEnd(timesTwoElement);
    
    this.board[row][column] *= 2;
    this.renderer.removeChild(mergeInBlock, timesTwoElement);

    await new Promise(requestAnimationFrame);
  }

  async mergeTwoBlocksLeft(row: number, column: number) {
    const rightBoardNumber = this.getNumberElement(row, column+1);


    const timesTwoElement = this.renderer.createElement('span');
    const mergeInBlock = this.getBlockElement(row, column);
    
    this.renderer.addClass(timesTwoElement, 'number');
    this.renderer.setStyle(timesTwoElement, 'z-index', '9990');
    this.renderer.setStyle(timesTwoElement, 'color', this.getBackgroundColorForNubmber(this.board[row][column]));
    this.renderer.setStyle(timesTwoElement, 'background-color', 'white');
    this.renderer.setStyle(timesTwoElement, 'opacity', '0');
    this.renderer.setStyle(timesTwoElement, 'transform', 'translateY(-100%)');
    this.renderer.setProperty(timesTwoElement, 'innerText', 'x2');
    this.renderer.setStyle(timesTwoElement, 'transition', 'all .4s cubic-bezier(0.1, 0.9, 0.1, 1)');
    this.renderer.appendChild(mergeInBlock, timesTwoElement);

    await new Promise(requestAnimationFrame);

    this.renderer.setStyle(rightBoardNumber, 'transform', 'translateX(-90px)');

    await this.waitForTransitionAnimationEnd(rightBoardNumber);

    this.board[row][column+1] = 0;
    this.maxBlock = Math.max(this.maxBlock, this.board[row][column]);
    await new Promise(requestAnimationFrame);

    this.renderer.setStyle(timesTwoElement, 'opacity', '1');
    this.renderer.setStyle(timesTwoElement, 'transform', 'translateY(-75px)');
    this.renderer.setStyle(timesTwoElement, 'scale', '1.1');

    await this.waitForTransitionAnimationEnd(timesTwoElement);
    
    this.board[row][column] *= 2;
    this.renderer.removeChild(mergeInBlock, timesTwoElement);

    await new Promise(requestAnimationFrame);
  }

  async mergeTwoBlocksRight(row: number, column: number) {
    const leftBoardNumber = this.getNumberElement(row, column-1);


    const timesTwoElement = this.renderer.createElement('span');
    const mergeInBlock = this.getBlockElement(row, column);
    
    this.renderer.addClass(timesTwoElement, 'number');
    this.renderer.setStyle(timesTwoElement, 'z-index', '9990');
    this.renderer.setStyle(timesTwoElement, 'color', this.getBackgroundColorForNubmber(this.board[row][column]));
    this.renderer.setStyle(timesTwoElement, 'background-color', 'white');
    this.renderer.setStyle(timesTwoElement, 'opacity', '0');
    this.renderer.setStyle(timesTwoElement, 'transform', 'translateY(-100%)');
    this.renderer.setProperty(timesTwoElement, 'innerText', 'x2');
    this.renderer.setStyle(timesTwoElement, 'transition', 'all .4s cubic-bezier(0.1, 0.9, 0.1, 1)');
    this.renderer.appendChild(mergeInBlock, timesTwoElement);

    await new Promise(requestAnimationFrame);

    this.renderer.setStyle(leftBoardNumber, 'transform', 'translateX(90px)');

    await this.waitForTransitionAnimationEnd(leftBoardNumber);

    this.board[row][column-1] = 0;
    this.maxBlock = Math.max(this.maxBlock, this.board[row][column]);
    await new Promise(requestAnimationFrame);

    this.renderer.setStyle(timesTwoElement, 'opacity', '1');
    this.renderer.setStyle(timesTwoElement, 'transform', 'translateY(-75px)');
    this.renderer.setStyle(timesTwoElement, 'scale', '1.1');

    await this.waitForTransitionAnimationEnd(timesTwoElement);
    
    this.board[row][column] *= 2;
    this.renderer.removeChild(mergeInBlock, timesTwoElement);

    await new Promise(requestAnimationFrame);
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

  getBackgroundColorForNubmber(num : number ){
    const numbers = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048];
    const index = numbers.indexOf(num);

    const vintageColors = [
                            '#DC1489',
                            '#DF2935',
                            '#86BA90',
                            '#C885BC',
                            '#3A7CA5',
                            '#77625C',
                            '#FF6F59',
                            '#EF3054',
                            '#AA7DCE',
                            '#412234',
                            '#16425B'
                          ];
    
    return vintageColors[index];

  }

  getFontSize(num : number) {
    if(num>=1000) return '2em';
    if(num>=100) return '3em';
    return '4em';
  }

  getLineHeight(num : number) {
    if(num>=1000) return '2.5';
    if(num>=100) return '1.8';
    return '1.25';
  }
}
