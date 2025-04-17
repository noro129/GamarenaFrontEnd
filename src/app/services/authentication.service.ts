import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignIn } from '../models/SignIn';
import { SignUp } from '../models/SignUp';
import { Token } from '../models/token';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private AUTH_URL = "http://localhost:8080/authentication";

  constructor(private http : HttpClient) { }

  signIn(signInData : SignIn) : Observable<Token> {
    return this.http.post<Token>(this.AUTH_URL+"/signin",
      { "username" : signInData.username,
        "password" : signInData.password
      }
    );
  }

  signUp(signUpData : SignUp) : Observable<Token> {
    return this.http.post<Token>(this.AUTH_URL+"/signup",
      { "email" : signUpData.email,
        "username" : signUpData.username,
        "password" : signUpData.password,
        "dateOfBirth" : signUpData.birth_date
      }
    )
  }
}
