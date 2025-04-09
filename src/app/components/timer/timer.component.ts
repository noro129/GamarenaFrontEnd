import { NgClass } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { delay } from 'rxjs';

@Component({
  selector: 'app-timer',
  imports: [NgClass],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss'
})
export class TimerComponent implements OnInit, OnDestroy {
  
  @Input() separator = ':';
  @Input() minutes = 0;
  @Input() seconds = 0;
  @Input() stopTimer = false;
  animate_minute_left_digit = false;
  animate_minute_right_digit = false;
  animate_second_left_digit = false;
  animate_second_right_digit = false;
  interval: any;




  timer() {
    this.interval = setInterval(() => {
      if (this.seconds === 59) {
        this.seconds = 0;
        this.minutes++;
        this.animate_second_right_digit = true;
        this.animate_second_left_digit = true;
        this.animate_minute_right_digit = true;
        if (this.minutes % 10 === 0) {
          this.animate_minute_left_digit = true;
        }
      } else {
        this.seconds++;
        this.animate_second_right_digit = true;
        if (this.seconds % 10 === 0) {
          this.animate_second_left_digit = true;
        }
      }
  
      setTimeout(() => {
        this.animate_second_right_digit = false;
        this.animate_second_left_digit = false;
        this.animate_minute_right_digit = false;
        this.animate_minute_left_digit = false;
      }, 800);
    }, 1000);
  }
  
  
  ngOnInit(): void {
    this.timer();
  }

  ngOnDestroy(): void {
    if(this.interval){
    clearInterval(this.interval);
    }
  }
  

  leftDigit(num : number) {
    return Math.floor(num/10);
  }
}
