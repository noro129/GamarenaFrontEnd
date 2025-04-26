import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class MinesweeperService {

  private URL = "http://localhost:8080/minesweeper"

  constructor(private http : HttpClient) { }

  initializeGame(rows: number, columns: number) : Observable<number[][]>{
    const params = new HttpParams().set("rows", rows).set("columns", columns);
    return this.http.get<number[][]>(this.URL+"/generate", {params});
  }
}
