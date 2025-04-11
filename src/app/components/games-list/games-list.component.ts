import { Component } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { NgFor } from '@angular/common';
import { GameItemComponent } from "../game-item/game-item.component";

@Component({
  selector: 'app-games-list',
  imports: [NavBarComponent, NgFor, GameItemComponent],
  templateUrl: './games-list.component.html',
  styleUrl: './games-list.component.scss'
})
export class GamesListComponent {
  gameLogosPath = 'gameLogo/';
  gamesList= [
    {
      gameName: 'Worduess',
      gameLikesNumber: 1245,
      gamePlayersNumber: 10000,
      gameDescription: 'A daily word guessing game where you have six chances to guess the five-letter word.',
      isGameLiked: true
    },
    {
      gameName: 'Sudoku',
      gameLikesNumber: 5678,
      gamePlayersNumber: 8000,
      gameDescription: 'A logic-based number puzzle where you fill a 9x9 grid with numbers from 1 to 9.',
      isGameLiked: false
    },
    {
      gameName: 'Twins-Hunt',
      gameLikesNumber: 5678,
      gamePlayersNumber: 3201,
      gameDescription: '.....',
      isGameLiked: false
    },
    {
      gameName: 'Sudoku',
      gameLikesNumber: 5678,
      gamePlayersNumber: 8000,
      gameDescription: 'A logic-based number puzzle where you fill a 9x9 grid with numbers from 1 to 9.',
      isGameLiked: true
    },
    {
      gameName: 'Sudoku',
      gameLikesNumber: 5678,
      gamePlayersNumber: 8000,
      gameDescription: 'A logic-based number puzzle where you fill a 9x9 grid with numbers from 1 to 9.',
      isGameLiked: false
    },
    {
      gameName: 'Sudoku',
      gameLikesNumber: 5678,
      gamePlayersNumber: 8000,
      gameDescription: 'A logic-based number puzzle where you fill a 9x9 grid with numbers from 1 to 9.',
      isGameLiked: false
    }
  ];


}
