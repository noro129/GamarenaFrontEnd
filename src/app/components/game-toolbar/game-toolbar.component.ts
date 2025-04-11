import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-game-toolbar',
  imports: [NgIf, RouterLink, NgClass],
  templateUrl: './game-toolbar.component.html',
  styleUrl: './game-toolbar.component.scss'
})
export class GameToolbarComponent {
  showInstructions = false;
  @Input() numberOfHintsLeft = 2;
  @Output() gameStartedEvent = new EventEmitter<boolean>();
  gameStarted = false;
  gameStopped = false;
  hideControls = false;
  controlsVisibilityButton = '<<';

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
  StopResumeGame() {
    this.gameStopped=!this.gameStopped;
  }


  showHideControlsSection() {
    if(this.controlsVisibilityButton==='<<'){
      this.controlsVisibilityButton='>>';
      this.hideControls=true;
    } else {
      this.controlsVisibilityButton='<<';
      this.hideControls=false;
    }
  }

  @HostListener('document:mousemove', ['$event'])
  mouseMove(event : MouseEvent) {
    if(this.controlsVisibilityButton==='<<' || this.exitGameDialogueShown || this.showInstructions) return;

    if (event.clientX <= 100) {
      this.hideControls = false;
    } else {
      this.hideControls = true;
    }
  }


}
