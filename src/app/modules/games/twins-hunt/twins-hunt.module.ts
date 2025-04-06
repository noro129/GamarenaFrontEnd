import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TwinsHuntComponent } from './twins-hunt/twins-hunt.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: TwinsHuntComponent }
    ])
  ]
})
export class TwinsHuntModule { }
