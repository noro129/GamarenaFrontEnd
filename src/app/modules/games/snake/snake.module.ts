import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnakeComponent } from './snake/snake.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: SnakeComponent }
    ])
  ]
})
export class SnakeModule { }
