import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class WorduessService {

  private URL = "http://localhost:8080/worduess";

  constructor(private http: HttpClient) { }

  getRandom5lengthWord() : Observable<string> {
    return this.http.get(this.URL+"/generate", { responseType: 'text' });
  }
}
