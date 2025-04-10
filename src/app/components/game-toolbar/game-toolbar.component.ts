import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-game-toolbar',
  imports: [NgIf],
  templateUrl: './game-toolbar.component.html',
  styleUrl: './game-toolbar.component.scss'
})
export class GameToolbarComponent {
  showInstructions = false;
  @Input() numberOfHintsLeft = 2;
  @Output() gameStartedEvent = new EventEmitter<boolean>();
  gameStarted = false;
  gameStopped = false;


  showInstructionsList() {this.showInstructions=true;}
  hideInstructions() {this.showInstructions=false;}
  exit() {}
  showHint() {this.numberOfHintsLeft--;}
  startGame() {
    this.gameStarted=true;
    this.gameStartedEvent.emit(true);
  }
  StopResumeGame() {this.gameStopped=!this.gameStopped;}
}
