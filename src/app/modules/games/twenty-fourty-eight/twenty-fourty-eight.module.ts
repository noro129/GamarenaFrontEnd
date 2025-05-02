import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TwentyFourtyEightComponent } from './twenty-fourty-eight/twenty-fourty-eight.component';
import { TwentyFourtyEightService } from './twenty-fourty-eight.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
              { path: '', component: TwentyFourtyEightComponent }
            ])
  ],
  providers: [TwentyFourtyEightService]
})
export class TwentyFourtyEightModule { }
