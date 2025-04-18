import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../models/game';

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
}
