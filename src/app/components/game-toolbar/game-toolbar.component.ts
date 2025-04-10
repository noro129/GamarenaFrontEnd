import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-toolbar',
  imports: [NgIf],
  templateUrl: './game-toolbar.component.html',
  styleUrl: './game-toolbar.component.scss'
})
export class GameToolbarComponent {
  showInstructions = false;
  @Input() numberOfHintsLeft = 2;
  gameStarted = false;
  gameStopped = false;


  showInstructionsList() {this.showInstructions=true;}
  hideInstructions() {this.showInstructions=false;}
  exit() {}
  showHint() {this.numberOfHintsLeft--;}
  startGame() {this.gameStarted=true;}
  StopResumeGame() {this.gameStopped=!this.gameStopped;}
}
