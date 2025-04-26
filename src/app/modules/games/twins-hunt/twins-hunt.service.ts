import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TwinsHuntService {

  private URL = "http://localhost:8080/twins-hunt";

  constructor(private http : HttpClient) { }

  initializeGame(rows : number, columns : number) : Observable<string[][]> {
    const params = new HttpParams().set("column" , columns).set("row", rows);
    return this.http.get<string[][]>(this.URL+"/generate", {params});
  }
}