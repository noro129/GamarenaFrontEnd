import { NgClass, NgIf } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-game-result',
  imports: [NgClass, NgIf],
  templateUrl: './game-result.component.html',
  styleUrl: './game-result.component.scss'
})
export class GameResultComponent implements OnChanges {
  @Input() isVisible: boolean = false;
  @Input() isSuccess: boolean = true;


  ngOnChanges(changes: SimpleChanges): void {
    if(changes['isVisible'] && changes['isVisible'].currentValue) {
      setTimeout(()=>{
        this.isVisible=false;
      },1500);
    }
  }

}
