import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorduessComponent } from './worduess/worduess.component';
import { RouterModule } from '@angular/router';
import { WorduessService } from './worduess.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: WorduessComponent }
    ])
  ],
  providers: [WorduessService]
})
export class WorduessModule { }
