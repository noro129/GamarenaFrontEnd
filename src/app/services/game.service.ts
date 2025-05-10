import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../models/game';
import { GameStat } from '../models/GameStat';
import { UserGameStat } from '../models/UserGameStat';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private URL = "http://localhost:8080/game"

  constructor(private http : HttpClient) { }


  getGames() : Observable<Game[]> {
    return this.http.get<Game[]>(this.URL+"/all");
  }

  gameReaction(gameName : string, liked : boolean) : Observable<boolean> {
    const params = new HttpParams().set("gameName", gameName);
    if (liked) return this.http.post<boolean>(this.URL+"/like", null, {params});
    else return this.http.post<boolean>(this.URL+"/dislike", null, {params});
  }

  startGame(gameName: string) : Observable<boolean> {
    const params = new HttpParams().set("gameName", gameName);
    return this.http.post<boolean>(this.URL+"/start",null, {params})
  }

  setGameResult(gameName: string, gameResult: boolean, minutes: number, seconds: number, hints: number) : Observable<boolean> {
    return this.http.post<boolean>(this.URL+'/set-result', {'gameName' : gameName, 'gameWon' : gameResult, 'minutes': minutes, 'seconds': seconds, 'hints': hints});
  }

  getGameStats(gameName: string, hints: number) : Observable<GameStat[]> {
    const params = new HttpParams().set("gameName", gameName).set("hints", hints);
    return this.http.get<GameStat[]>(this.URL+"/stats", {params});
  }

  getUserGameStats(gameName : string) : Observable<UserGameStat[]> {
    const params = new HttpParams().set("gameName", gameName);
    return this.http.get<UserGameStat[]>(this.URL+"/stats/user", {params});
  }
}
