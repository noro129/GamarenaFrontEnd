import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class SudokuService {

  private URL = "http://localhost:8080/sudoku";

  constructor(private http : HttpClient) { }

  initializeGame() : Observable<string[][]> {
    return this.http.get<string[][]>(this.URL+"/generate");
  }

}
