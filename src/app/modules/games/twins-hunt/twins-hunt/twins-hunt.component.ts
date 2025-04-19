import { NgFor } from '@angular/common';
import { Component, ElementRef, OnInit, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { TimerComponent } from '../../../../components/timer/timer.component';
import { GameToolbarComponent } from '../../../../components/game-toolbar/game-toolbar.component';
import { GameResultComponent } from '../../../../components/game-result/game-result.component';
import { TwinsHuntService } from '../twins-hunt.service';

@Component({
  selector: 'app-twins-hunt',
  imports: [NgFor, TimerComponent, GameToolbarComponent, GameResultComponent],
  templateUrl: './twins-hunt.component.html',
  styleUrl: './twins-hunt.component.scss'
})
export class TwinsHuntComponent implements OnInit{
  @ViewChild('matrix') matrix!: ElementRef;



  colorsMatrix! : string[][];
  rows = 6;
  columns = 6;
  startGame = false;
  gameName = "Twins-Hunt";
  gameSolved = false;
  showCells = false;
  colorsMatched = 0;
  colorTwin1 = [-1, -1];
  colorTwin2 = [-1, -1];

  constructor(private renderer : Renderer2, private twinshuntService : TwinsHuntService) {}

  ngOnInit(): void {
    this.twinshuntService.initializeGame(this.rows, this.columns).subscribe({
      next: (response) => {
        console.log(response);
        this.colorsMatrix = response;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  
  handleGameStart(event : boolean) {
    const cells = this.matrix.nativeElement.querySelectorAll(".row-cell");
    this.startRevealing(cells, 0);
  }

  startRevealing(elements : ElementRef[], index : number) {
    setTimeout(()=>{
      let rowIndex = Math.floor(index/this.rows);
      let columnIndex = index - rowIndex*this.rows;
      this.renderer.setStyle(elements[index], 'background-color', this.colorsMatrix[rowIndex][columnIndex])
      this.renderer.addClass(elements[index], 'show-cell');
      if (index<elements.length-1) this.startRevealing(elements, index+1);
      else this.startHiding(elements, 0);
    },300)
  }

  startHiding(elements : ElementRef[], index : number) {
    setTimeout(()=>{
      this.renderer.removeClass(elements[index], 'show-cell');
      if (index < elements.length - 1) this.startHiding(elements, index+1);
      else this.startGame = true;
    },300)
  }

  indexesArray(size : number) : number[] {
    return Array.from({ length : size}, (_, i) => i);
  }

  cellClick(i: number, j: number) {
    if(!this.startGame || this.colorTwin2[0] != -1) return;
    if (this.colorTwin1[0]===-1) {
      this.colorTwin1 = [i, j];
      this.renderer.addClass(this.matrix.nativeElement.querySelectorAll(".row-cell")[i*this.rows + j], 'show-cell');
    } else {
      if (i == this.colorTwin1[0] && j==this.colorTwin1[1]) return;
      this.colorTwin2 = [i, j];
      this.renderer.addClass(this.matrix.nativeElement.querySelectorAll(".row-cell")[i*this.rows + j], 'show-cell');

      this.areEqual(this.colorTwin1, this.colorTwin2);
    }
  }

  areEqual(cell1: number[], cell2: number[]) {
    const className = this.colorsMatrix[cell1[0]][cell1[1]] === this.colorsMatrix[cell2[0]][cell2[1]] ? "correct-match-animation" : "error-match-animation";
    this.renderer.addClass(this.matrix.nativeElement.querySelectorAll(".row-cell")[cell1[0]*this.rows + cell1[1]], className);
    this.renderer.addClass(this.matrix.nativeElement.querySelectorAll(".row-cell")[cell2[0]*this.rows + cell2[1]], className);


    setTimeout(()=>{

      if(this.colorsMatrix[cell1[0]][cell1[1]] !== this.colorsMatrix[cell2[0]][cell2[1]]){
        this.renderer.removeClass(this.matrix.nativeElement.querySelectorAll(".row-cell")[cell1[0]*this.rows + cell1[1]], 'show-cell');
        this.renderer.removeClass(this.matrix.nativeElement.querySelectorAll(".row-cell")[cell2[0]*this.rows + cell2[1]], 'show-cell');
      } else {
        this.colorsMatched++;
      }
      this.colorTwin1 = [-1, -1];
      this.colorTwin2 = [-1, -1];
      this.renderer.removeClass(this.matrix.nativeElement.querySelectorAll(".row-cell")[cell1[0]*this.rows + cell1[1]], className);
      this.renderer.removeClass(this.matrix.nativeElement.querySelectorAll(".row-cell")[cell2[0]*this.rows + cell2[1]], className);
    },350)
  }
}
