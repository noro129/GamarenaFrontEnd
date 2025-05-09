import { NgClass } from '@angular/common';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { delay } from 'rxjs';
import { DataShareService } from '../../services/data-share.service';

@Component({
  selector: 'app-timer',
  imports: [NgClass],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss'
})
export class TimerComponent implements OnDestroy, OnChanges {
  
  @Input() separator = ':';
  @Input() minutes = 0;
  @Input() seconds = 0;
  @Input() startTimer = false;
  @Input() stopTimer = false;
  animate_minute_left_digit = false;
  animate_minute_right_digit = false;
  animate_second_left_digit = false;
  animate_second_right_digit = false;

  constructor(private dataShareService : DataShareService) {}

  ngOnDestroy(): void {
    this.stopTimer=true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['startTimer'] && changes['startTimer'].currentValue) {
      this.timer();
    }
    if(changes['stopTimer'] && changes['stopTimer'].currentValue) {
      this.dataShareService.sendData({
        'minutes' : this.minutes,
        'seconds' : this.seconds
      })
    }
  }
  

  leftDigit(num : number) {
    return Math.floor(num/10);
  }


  timer() {
    setTimeout(()=>{
      if(this.stopTimer) return;
      if (this.seconds === 59) {
        this.animate_second_right_digit = true;
        this.animate_second_left_digit = true;
        this.animate_minute_right_digit = true;
        if ((this.minutes+1) % 10 === 0) {
          this.animate_minute_left_digit = true;
        }
      } else {
        this.animate_second_right_digit = true;
        if ((this.seconds+1) % 10 === 0) {
          this.animate_second_left_digit = true;
        }
      }
      this.nextSecond();
    },200)
  }

  nextSecond() {
    setTimeout(()=>{
      if(this.stopTimer) return;
      if (this.seconds === 59) {
        this.seconds = 0;
        this.minutes++;
      } else {
        this.seconds++;
      }
      this.animate_second_right_digit = false;
      this.animate_second_left_digit = false;
      this.animate_minute_right_digit = false;
      this.animate_minute_left_digit = false;
      if(!this.stopTimer) this.timer();
    },800)
  }
}
