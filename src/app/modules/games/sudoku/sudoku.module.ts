import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SudokuComponent } from './sudoku/sudoku.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
          { path: '', component: SudokuComponent }
        ])
  ]
})
export class SudokuModule { }
