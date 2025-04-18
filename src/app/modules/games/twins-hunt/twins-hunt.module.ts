import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TwinsHuntComponent } from './twins-hunt/twins-hunt.component';
import { TwinsHuntService } from './twins-hunt.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: TwinsHuntComponent }
    ])
  ],
  providers: [TwinsHuntService]
})
export class TwinsHuntModule { }
