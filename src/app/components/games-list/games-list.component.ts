import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { NgFor } from '@angular/common';
import { GameItemComponent } from "../game-item/game-item.component";
import { Game } from '../../models/game';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-games-list',
  imports: [NavBarComponent, NgFor, GameItemComponent],
  templateUrl: './games-list.component.html',
  styleUrl: './games-list.component.scss'
})
export class GamesListComponent implements OnInit {
  gameLogosPath = 'gameLogo/';

  gamesList!: Game[];

  constructor(private gameService : GameService) {}

  ngOnInit(): void {
    this.gameService.getGames().subscribe({
      next: (response) => {
        console.log(response);
        this.gamesList = response;
      },
      error: (err)=> {
        console.log(err);
      }
    })
    this.gamesList = [];
  }

}
