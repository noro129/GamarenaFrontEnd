import { NgClass, NgFor } from '@angular/common';
import { Component, Directive, HostListener, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-snake',
  imports: [NgFor, NgClass],
  templateUrl: './snake.component.html',
  styleUrl: './snake.component.scss'
})
export class SnakeComponent implements OnInit, OnDestroy{
  boardX = 40;
  boardY = 40;
  gameStart = false;
  snake: number[][] = [[this.boardX/2 - 1, this.boardY/2 - 1]];
  currentDir: string = 'up';
  apple: number[] = [-1, -1];
  interval!: any;

  ngOnInit(): void {
    this.moveSnake();
    this.putApple();
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }


  toArray(size: number) {
    return Array.from({length: size}, (_, i)=> i);
  }

  isSnakeBody(x: number, y: number) : boolean {
    return this.snake.some(([a, b]) => a===x && b===y);
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if(event.key === 'ArrowUp' && this.currentDir !== 'down') {this.currentDir='up'}
    if(event.key === 'ArrowDown' && this.currentDir !== 'up') {this.currentDir='down'}
    if(event.key === 'ArrowLeft' && this.currentDir !== 'right') {this.currentDir='left'}
    if(event.key === 'ArrowRight' && this.currentDir !== 'left') {this.currentDir='right'}
  }

  moveSnake() {
    this.interval = setInterval(
      ()=>{
        let temp = this.snake[0];
        switch(this.currentDir) {
          case 'up' :
            if(this.snake[0][0] === 0 ) this.snake[0] = [this.boardX-1, this.snake[0][1]];
            else this.snake[0] = [this.snake[0][0]-1, this.snake[0][1]];
            break;
          case 'down' :
            if(this.snake[0][0] === this.boardX-1 ) this.snake[0] = [0, this.snake[0][1]];
            else this.snake[0] = [this.snake[0][0]+1, this.snake[0][1]];
            break;
          case 'left' :
            if(this.snake[0][1] === 0 ) this.snake[0] = [this.snake[0][0], this.boardY-1];
            else this.snake[0] = [this.snake[0][0], this.snake[0][1]-1];
            break;
          case 'right' :
            if(this.snake[0][1] === this.boardY-1 ) this.snake[0] = [this.snake[0][0], 0];
            else this.snake[0] = [this.snake[0][0], this.snake[0][1]+1];
            break;
        }
        for(let i=1; i<this.snake.length; i++) {
          const prev = this.snake[i];
          this.snake[i] = temp;
          temp = prev;
        }

        if(this.snake[0][0] === this.apple[0] && this.snake[0][1]===this.apple[1]){
          this.putApple();
          this.snake.push(temp);
        } 
      },200)
  }

  putApple(){
    this.apple[0] = Math.floor(Math.random() * this.boardX);
    this.apple[1] = Math.floor(Math.random() * this.boardY);
  }

}
