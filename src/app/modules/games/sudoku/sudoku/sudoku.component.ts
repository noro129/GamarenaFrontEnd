import { NgClass, NgFor } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-soduko',
  imports: [NgFor, NgClass],
  templateUrl: './sudoku.component.html',
  styleUrl: './sudoku.component.scss'
})
export class SudokuComponent implements OnInit {
  gameName = "Sudoku";
  blocks = 9;
  cells = 9;
  subCells = 9;
  coordinates = [-1,-1];
  sudokuToSolve!: string[][];
  attempt!: string[][];
  validateBlocks = [false, false, false, 
                    false, false, false, 
                    false, false, false];
  validateRows = [false, false, false, 
                  false, false, false, 
                  false, false, false];
  validateColumns = [false, false, false, 
                     false, false, false, 
                     false, false, false];
  placeMode = true;
  pencilMode = false;
  
  ngOnInit(): void {
    this.populateAttemptMatrix();
  }

  populateAttemptMatrix() {
    this.attempt = [];
    this.sudokuToSolve = [];

    for(let block=0; block<this.blocks; block++) {
      this.sudokuToSolve[block] = [];
      this.attempt[block] = [];
      for(let cell=0; cell<this.cells; cell++) {
        this.sudokuToSolve[block][cell] = '';
        this.attempt[block][cell] = '';
      }
    }

    this.sudokuToSolve[0][1] = '1';
    this.attempt[0][0] = '3';
  }

  indexesArray(size : number) : number[] {
    return Array.from({ length : size}, (_, i) => i);
  }

  clickCell(block : number, cell : number) {
    if(this.sudokuToSolve[block][cell] !== '') return;
    this.coordinates = [block, cell];
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if(this.coordinates[0] == -1) return;
    if(/^[1-9]$/.test(event.key)) {
      this.attempt[this.coordinates[0]][this.coordinates[1]] = event.key;
      this.checkRow(Math.floor(this.coordinates[0]/3) * 3 + Math.floor(this.coordinates[1] / 3));
      this.checkColumn(Math.floor(this.coordinates[0]%3) * 3 + this.coordinates[1] % 3);
      this.checkBlock(this.coordinates[0]);
    } else if(event.key === "ArrowUp") {
      this.upKey();
    } else if(event.key === "ArrowDown") {
      this.downKey();
    } else if(event.key === "ArrowLeft") {
      this.leftKey();
    } else if(event.key === "ArrowRight") {
      this.rightKey();
    } else if(event.key === "Backspace") {
      this.attempt[this.coordinates[0]][this.coordinates[1]] = '';
    }
  }


  upKey() {
    if(this.coordinates[1]<3) {
      if(this.coordinates[0]<3) this.coordinates[0] = this.coordinates[0] + 6;
      else this.coordinates[0] = this.coordinates[0] - 3;
      this.coordinates[1] = this.coordinates[1] + 6;
    } else {
      this.coordinates[1] = this.coordinates[1] - 3;
    }
    if(this.sudokuToSolve[this.coordinates[0]][this.coordinates[1]] !== '') this.upKey();
  }

  downKey() {
    if(this.coordinates[1]>5) {
      this.coordinates[1] = this.coordinates[1] - 6;
      if(this.coordinates[0]>5) this.coordinates[0] = this.coordinates[0] - 6;
      else this.coordinates[0] = this.coordinates[0] + 3;
    } else {
      this.coordinates[1] = this.coordinates[1] + 3;
    }
    if(this.sudokuToSolve[this.coordinates[0]][this.coordinates[1]] !== '') this.downKey();
  }

  leftKey() {
    if(this.coordinates[1]%3==0) {
      this.coordinates[1] = this.coordinates[1] + 2;
      if (this.coordinates[0]%3==0) this.coordinates[0] = this.coordinates[0] + 2;
      else this.coordinates[0] = this.coordinates[0] - 1;
    } else {
      this.coordinates[1] = this.coordinates[1] - 1;
    }
    if(this.sudokuToSolve[this.coordinates[0]][this.coordinates[1]] !== '') this.leftKey();
  }

  rightKey() {
    if(this.coordinates[1]%3==2) {
      this.coordinates[1] = this.coordinates[1] - 2;
      if (this.coordinates[0]%3==2) this.coordinates[0] = this.coordinates[0] - 2;
      else this.coordinates[0] = this.coordinates[0] + 1;
    } else {
      this.coordinates[1] = this.coordinates[1] + 1;
    }
    if(this.sudokuToSolve[this.coordinates[0]][this.coordinates[1]] !== '') this.rightKey();
  }

  checkRow(row : number){ console.log("checking row: "+row)}

  checkColumn(column : number){ console.log("checking column: "+column)}

  checkBlock(block : number){ 
    console.log("checking block: "+block)
    const valuesSet = new Set<string>();
    for(let i =0; i<9; i++) {
      if (this.attempt[block][i] === '' || valuesSet.has(this.attempt[block][i])) {
        this.validateBlocks[block] = false;
        return;
      }
      valuesSet.add(this.attempt[block][i]);
    }
    this.validateBlocks[block] = true;
  }

  buttonClick(placeModeClicked : boolean) {
    if ((placeModeClicked && this.placeMode) || (!placeModeClicked && this.pencilMode)) return;
    this.placeMode = !this.placeMode;
    this.pencilMode = !this.pencilMode;
  }

  restartGame() {
    this.populateAttemptMatrix();
  }
}
