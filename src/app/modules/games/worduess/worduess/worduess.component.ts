import { NgClass, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-worduess',
  imports: [NgIf, NgFor, NgClass, UpperCasePipe],
  templateUrl: './worduess.component.html',
  styleUrl: './worduess.component.scss'
})
export class WorduessComponent {
  wordsList: string[] = ["ALBUM",
    "GIANT",
    "GREAT",
    "STATE",
    "WORLD",
    "START",
    "LOSER",
    "READY",
    "SORRY",
    "ZEBRA",
    "TIGER",
    "RIVER",
    "CYCLE",
    "ABOUT",
    "PRIZE",
    "ADAPT",
    "BLOCK",
    "HUMOR"];
  destroyAttempt = [false, false, false, false, false];
  attempts: string[][];
  attemptsValidation: number[][];
  showInstructions = false;
  currentWord = '     ';
  currentAttempt = 0;
  currentIndex = 0;
  startGame = false;

  wordToGuess = '';

  gameSolved = false;

  constructor() {
    this.attempts = [];
    this.attemptsValidation = [];
    this.constructGame();
  }

  constructGame() {
    this.wordToGuess = this.getRandomWord();
    console.log("correct word: "+this.wordToGuess);
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
    if(this.gameSolved) return;
    if(event.keyCode<=90 && event.keyCode>=65){
      if (this.currentIndex==5) return;
      this.attempts[this.currentAttempt][this.currentIndex] = event.key;
      this.currentWord = this.currentWord.substring(0, this.currentIndex) + event.key.toUpperCase() + this.currentWord.substring(this.currentIndex+1, 5);
      this.currentIndex++;
      while(this.currentIndex<5 && this.attemptsValidation[this.currentAttempt][this.currentIndex]==1) this.currentIndex++;
    } else if (event.key==='Backspace') {
      this.deleteLastEnteredKey();
    } else if (this.currentIndex==5 && event.key==='Enter') {
      this.checkAttempt();
    }
  }

  checkAttempt() {
    console.log("check attempted word: "+this.currentWord);
    if (this.currentWord === this.wordToGuess.toUpperCase()) {
      this.attemptsValidation[this.currentAttempt]=[1,1,1,1,1];
      console.log("CONGRATULATIONS YOU SOLVED IT! :)");
      this.gameSolved=true;
      for(let i =this.currentAttempt+1; i<6; i++) {
        this.destroyAttempt[i]=true;
      }
    }
    this.currentAttempt++;
    this.currentWord = '     ';
    this.currentIndex=0;
  }

  deleteLastEnteredKey() {
    this.attempts[this.currentAttempt][this.currentWord.length-1] = '';
    this.currentWord = this.currentWord.substring(0, this.currentWord.length-1);
    console.log("remove last letter");
  }


  getRandomWord() {
    return this.wordsList[Math.floor(Math.random()*this.wordsList.length)];
  }

  showInstructionsList() {
    this.showInstructions = true;
  }


  exit() {
    console.log("quitting...");
  }

}
