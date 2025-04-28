import { NgClass, NgFor } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { SudokuService } from '../sudoku.service';

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
  guesses!: string[][][];
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

  constructor(private sudokuService : SudokuService) {
    
  }
  
  ngOnInit(): void {
    this.sudokuService.initializeGame().subscribe({
      next: (response) => {
        this.sudokuToSolve = response;
      },
      error: (error) => {
        console.log(error);
      }
    })

    this.populateAttemptAndGuessesMatrix();
  }

  populateAttemptAndGuessesMatrix() {
    this.attempt = [];
    this.guesses = [];

    for(let block=0; block<this.blocks; block++) {
      this.attempt[block] = [];
      this.guesses[block] = [];
      for(let cell=0; cell<this.cells; cell++) {
        this.attempt[block][cell] = '';
        this.guesses[block][cell] = [];
        
      }
    }

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
    if(event.key.toUpperCase() === 'P') {
      this.placeMode= !this.placeMode;
      this.pencilMode= !this.pencilMode;
    }
    if(/^[1-9]$/.test(event.key)) {
      if (this.placeMode) {
        this.attempt[this.coordinates[0]][this.coordinates[1]] = event.key;
        this.guesses[this.coordinates[0]][this.coordinates[1]].length = 0;
        this.checkRow(this.coordinates[0], this.coordinates[1]);
        this.checkColumn(this.coordinates[0], this.coordinates[1]);
        this.checkBlock(this.coordinates[0]);
      } else {
        if (this.attempt[this.coordinates[0]][this.coordinates[1]] !== '') this.addGuess(this.coordinates[0], this.coordinates[1], this.attempt[this.coordinates[0]][this.coordinates[1]]);
        this.attempt[this.coordinates[0]][this.coordinates[1]]='';
        this.addGuess(this.coordinates[0], this.coordinates[1], event.key);
      }
    } else if(event.key === "ArrowUp") {
      this.upKey();
    } else if(event.key === "ArrowDown") {
      this.downKey();
    } else if(event.key === "ArrowLeft") {
      this.leftKey();
    } else if(event.key === "ArrowRight") {
      this.rightKey();
    } else if(event.key === "Backspace") {
      if (this.placeMode) {
        this.attempt[this.coordinates[0]][this.coordinates[1]] = '';
        this.validateBlocks[this.coordinates[0]] = false;
        this.validateColumns[this.getColumn(this.coordinates[0], this.coordinates[1])] = false;
        this.validateRows[this.getRow(this.coordinates[0], this.coordinates[1])] = false;
      } else {
        this.guesses[this.coordinates[0]][this.coordinates[1]].pop();
      }
      
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

  checkRow(block : number, cell : number){
    const row = this.getRow(this.coordinates[0], this.coordinates[1]);
    const valuesSet = new Set<string>();
    valuesSet.add(this.attempt[block][cell]);
    for(let i =0; i<8; i++) {
      if(cell%3==2) {
        cell = cell - 2;
        if(block%3==2) block = block - 2;
        else block = block + 1;
      } else cell = cell + 1;
      if((this.attempt[block][cell]==='' && this.sudokuToSolve[block][cell]==='') || valuesSet.has(this.attempt[block][cell]) || valuesSet.has(this.sudokuToSolve[block][cell])) {
        this.validateRows[row] = false;
        return;
      } else if(this.attempt[block][cell]==='') {
        valuesSet.add(this.sudokuToSolve[block][cell]);
      } else {
        valuesSet.add(this.attempt[block][cell]);
      }
    }
    this.validateRows[row] = true;
  }

  checkColumn(block : number, cell : number){
    const column = this.getColumn(block, cell);
    const valuesSet = new Set<string>();
    valuesSet.add(this.attempt[block][cell]);
    for(let i =0; i<8; i++) {
      if(cell>5) {
        cell = cell - 6;
        if(block>5) block = block - 6;
        else block = block + 3;
      } else cell = cell + 3;
      if((this.attempt[block][cell]==='' && this.sudokuToSolve[block][cell]==='') || valuesSet.has(this.attempt[block][cell]) || valuesSet.has(this.sudokuToSolve[block][cell])) {
        this.validateColumns[column] = false;
        return;
      } else if(this.attempt[block][cell]==='') {
        valuesSet.add(this.sudokuToSolve[block][cell]);
      } else {
        valuesSet.add(this.attempt[block][cell]);
      }
    }
    this.validateColumns[column] = true;
  }

  checkBlock(block : number){
    const valuesSet = new Set<string>();
    for(let i =0; i<9; i++) {
      if ((this.attempt[block][i] === '' && this.sudokuToSolve[block][i] === '') || valuesSet.has(this.attempt[block][i]) || valuesSet.has(this.sudokuToSolve[block][i])) {
        this.validateBlocks[block] = false;
        return;
      }
      if (this.attempt[block][i] === '') valuesSet.add(this.sudokuToSolve[block][i]);
      else valuesSet.add(this.attempt[block][i]);
    }
    this.validateBlocks[block] = true;
  }

  getRow(block : number, cell : number) : number {
    return Math.floor(block / 3) * 3 + Math.floor(cell / 3);
  }

  getColumn(block : number, cell : number) : number{
    return (block%3) * 3 + cell % 3;
  }

  addGuess(block : number, cell : number, guess : string) {
    if(this.guesses[block][cell].length == 9) return;
    for(let index=0; index<this.guesses[block][cell].length; index++) {
      if (this.guesses[block][cell][index] === guess) return;
    }
    this.guesses[block][cell].push(guess);
  }

  buttonClick(placeModeClicked : boolean) {
    if ((placeModeClicked && this.placeMode) || (!placeModeClicked && this.pencilMode)) return;
    this.placeMode = !this.placeMode;
    this.pencilMode = !this.pencilMode;
  }

  restartGame() {
    this.validateBlocks = [
                          false, false, false, 
                          false, false, false, 
                          false, false, false
                          ];

    this.validateRows = [
                        false, false, false, 
                        false, false, false, 
                        false, false, false
                        ];

    this.validateColumns = [
                          false, false, false, 
                          false, false, false, 
                          false, false, false
                          ];

    this.populateAttemptAndGuessesMatrix();
  }
}
