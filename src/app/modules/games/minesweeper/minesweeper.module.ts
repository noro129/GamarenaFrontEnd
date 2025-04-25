import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinesweeperService } from './minesweeper.service';
import { MinesweeperComponent } from './minesweeper/minesweeper.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: MinesweeperComponent }
    ])
  ],
  providers: [MinesweeperService]
})
export class MinesweeperModule { }
