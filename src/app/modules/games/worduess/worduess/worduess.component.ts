import { NgClass, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-worduess',
  imports: [NgIf, NgFor, NgClass, UpperCasePipe],
  templateUrl: './worduess.component.html',
  styleUrl: './worduess.component.scss'
})
export class WorduessComponent {
  attempts: string[][];
  attemptsValidation: number[][];
  showInstructions = false;
  currentWord = '';
  currentAttempt = 0;
  startGame = false;

  wordToGuess = this.getRandomWord();

  constructor() {
    this.attempts = [];
    this.attemptsValidation = [];

    for(var i: number = 0; i < 6; i++) {
        this.attempts[i] = [];
        this.attemptsValidation[i] = [];
        for(var j: number = 0; j< 5; j++) {
            this.attempts[i][j] = ' ';
            this.attemptsValidation[i][j] = 0;
        }
    }
  }


  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if(event.keyCode<=90 && event.keyCode>=65){
      if (this.currentWord.length==5) return;
      this.attempts[this.currentAttempt][this.currentWord.length] = event.key;
      this.currentWord = this.currentWord + event.key;
    } else if (event.key==='Backspace') {
      this.attempts[this.currentAttempt][this.currentWord.length-1] = '';
      this.currentWord = this.currentWord.substring(0, this.currentWord.length-1);
      console.log("remove last letter");
    } else if (this.currentWord.length==5 && event.key==='Enter') {
      console.log("check attempted word");
      this.currentAttempt++;
      this.currentWord = '';
    }
  }


  getRandomWord() {
    return 'brain';
  }

  showInstructionsList() {
    this.showInstructions = true;
  }


  exit() {
    console.log("quitting...");
  }

}
