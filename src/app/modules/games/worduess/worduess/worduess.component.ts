import { NgClass, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Component, HostListener, OnChanges, SimpleChanges } from '@angular/core';
import { TimerComponent } from '../../../../components/timer/timer.component';
import { GameToolbarComponent } from "../../../../components/game-toolbar/game-toolbar.component";
import { GameResultComponent } from "../../../../components/game-result/game-result.component";
import { WorduessService } from '../worduess.service';

@Component({
  selector: 'app-worduess',
  imports: [NgFor, NgClass, UpperCasePipe, TimerComponent, GameToolbarComponent, GameResultComponent],
  templateUrl: './worduess.component.html',
  styleUrl: './worduess.component.scss'
})
export class WorduessComponent {
  gameName = "Worduess";

  destroyAttempt = [false, false, false, false, false];
  attempts: string[][];
  attemptsValidation: number[][];
  showInstructions = false;
  currentWord = '     ';
  currentAttempt = 0;
  currentIndex = -1;
  startGame = false;

  wordToGuess = '';

  gameSolved = false;

  constructor(private worduessService : WorduessService) {
    this.attempts = [];
    this.attemptsValidation = [];
    this.constructGame();
  }

  constructGame() {
    this.getRandomWord();
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
    if(!this.startGame || this.gameSolved) {
      return;
    }
    if(/^[A-Z]$/.test(event.key.toUpperCase())){
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
    console.log('check word: '+this.currentWord);
    this.wordToGuess = this.wordToGuess.toUpperCase();
    if (this.currentWord === this.wordToGuess) {
      this.attemptsValidation[this.currentAttempt]=[1,1,1,1,1];
      this.gameSolved=true;
      for(let i =this.currentAttempt+1; i<6; i++) {
        this.destroyAttempt[i]=true;
      }
      return;
    }
    const letterCount = this.getLetterCount(this.wordToGuess);
    for(let i =0; i<5; i++){
      if(this.currentWord.charAt(i)===this.wordToGuess.charAt(i)) {
        this.attemptsValidation[this.currentAttempt][i]=1;
        letterCount[this.currentWord.charAt(i)] = letterCount[this.currentWord.charAt(i)]-1;
        if(this.currentAttempt<5){
          this.attemptsValidation[this.currentAttempt+1][i] =1;
          this.attempts[this.currentAttempt+1][i]=this.currentWord.charAt(i);
        }
      }
    }
    for(let i=0; i<5; i++) {
      if(this.attemptsValidation[this.currentAttempt][i]==1) continue;
      else{
        this.attemptsValidation[this.currentAttempt][i] = letterCount[this.currentWord.charAt(i)] >0 ? -2 : -1;
        letterCount[this.currentWord.charAt(i)] = letterCount[this.currentWord.charAt(i)]-1;
        this.currentWord = this.currentWord.substring(0, i) + ' ' + this.currentWord.substring(i+1, 5);
      }
    }
    this.currentAttempt++;
    this.currentIndex=this.currentWord.indexOf(' ');
  }

  deleteLastEnteredKey() {
    this.currentIndex--;
    while (this.currentIndex>=0 && this.attemptsValidation[this.currentAttempt][this.currentIndex]==1) this.currentIndex--;
    if(this.currentIndex==-1) {
      this.currentIndex=0;
      while (this.attemptsValidation[this.currentAttempt][this.currentIndex]==1) this.currentIndex++;
      return;
    }
    this.currentWord = this.currentWord.substring(0, this.currentIndex) + ' ' + this.currentWord.substring(this.currentIndex+1, 5);
    this.attempts[this.currentAttempt][this.currentIndex]=' ';
    console.log("remove last letter");
  }


  getRandomWord() {
    this.worduessService.getRandom5lengthWord().subscribe({
      next: (response) => {
        this.wordToGuess = response;
        console.log("return word: "+this.wordToGuess);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getLetterCount(str: string): Record<string, number> {
    const letterCount: Record<string, number> = {};
  
    for (const letter of str) {
      letterCount[letter] = (letterCount[letter] || 0) + 1;
    }
  
    return letterCount;
  }

  showInstructionsList() {
    this.showInstructions = true;
  }


  handleGameStart(event : boolean) {
    this.startGame = true;
    this.currentIndex=0;
  }

}
