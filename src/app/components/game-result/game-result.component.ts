import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-game-result',
  imports: [NgClass, NgIf, NgFor, RouterLink],
  templateUrl: './game-result.component.html',
  styleUrl: './game-result.component.scss'
})
export class GameResultComponent {
  @Input() isVisible: boolean = false;
  @Input() isSuccess: boolean = true;


  hide() {
    this.isVisible= false;
  }

}
