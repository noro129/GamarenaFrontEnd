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


[
  ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF"],
  ["#FF8000", "#8000FF", "#750955", "#00FF80", "#FF0080", "#808080"],
  ["#804000", "#FF8080", "#FFFF80", "#80FF80", "#8080FF", "#000000"],
  ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF"],
  ["#FF8000", "#8000FF", "#750955", "#00FF80", "#FF0080", "#808080"],
  ["#804000", "#FF8080", "#FFFF80", "#80FF80", "#8080FF", "#000000"]
]