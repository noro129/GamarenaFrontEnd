import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-game-toolbar',
  imports: [NgIf, RouterLink],
  templateUrl: './game-toolbar.component.html',
  styleUrl: './game-toolbar.component.scss'
})
export class GameToolbarComponent {
  showInstructions = false;
  @Input() numberOfHintsLeft = 2;
  @Output() gameStartedEvent = new EventEmitter<boolean>();
  gameStarted = false;
  gameStopped = false;

  exitGameDialogueShown = false;


  showInstructionsList() {this.showInstructions=true;}
  hideInstructions() {this.showInstructions=false;}
  showExitGameDialogue() {this.exitGameDialogueShown=true;}
  hideExitGameDialogue() {this.exitGameDialogueShown=false;}
  showHint() {this.numberOfHintsLeft--;}
  startGame() {
    this.gameStarted=true;
    this.gameStartedEvent.emit(true);
  }
  StopResumeGame() {this.gameStopped=!this.gameStopped;}
}
