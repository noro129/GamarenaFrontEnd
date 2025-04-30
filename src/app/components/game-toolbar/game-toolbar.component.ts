import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-toolbar',
  imports: [NgIf, RouterLink, NgClass],
  templateUrl: './game-toolbar.component.html',
  styleUrl: './game-toolbar.component.scss'
})
export class GameToolbarComponent {
  showInstructions = false;
  @Input() numberOfHintsLeft = 0;
  @Input() gameName!: string;
  @Output() gameStartedEvent = new EventEmitter<boolean>();
  gameStarted = false;
  gameStopped = false;
  hideControls = false;
  controlsVisibilityButton = '<<';

  exitGameDialogueShown = false;

  constructor(private gameService : GameService) {}


  showInstructionsList() {this.showInstructions=true;}
  hideInstructions() {this.showInstructions=false;}
  showExitGameDialogue() {this.exitGameDialogueShown=true;}
  hideExitGameDialogue() {this.exitGameDialogueShown=false;}
  showHint() {this.numberOfHintsLeft--;}
  startGame() {
    this.gameStarted=true;
    this.gameService.startGame(this.gameName).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
    });
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
