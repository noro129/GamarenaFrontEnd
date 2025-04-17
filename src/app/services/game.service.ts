import { HttpClient } from '@angular/common/http';
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
}
