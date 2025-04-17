import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { SignIn } from '../../models/SignIn';
import { SignUp } from '../../models/SignUp';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-welcome',
  imports: [FormsModule, NgIf, NgClass],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {

  title = 'Gamarena';
  description = 'A Game Arena grouping challenging games for users like <span>wordle</span>, sudoku, twins hunt and more.';

  signinData : SignIn = {
    username : '',
    password : ''
  };
  signupData : SignUp = {
    username : '',
    password : '',
    email : '',
    birth_date : ''
  };

  isSignin = false;
  isSignup = false;

  focused = {
    username : false,
    password : false,
    email : false,
    birth_date : false
  }

  constructor(
    private authService : AuthenticationService,
    private router : Router
  ) {}


  signin() {
    this.isSignin = true;
    this.isSignup = false;

    this.resetFocused();
  }


  signup() {
    this.isSignin = false;
    this.isSignup = true;

    this.resetFocused();
  }

  resetFocused() {
    this.focused.username=false;
    this.focused.password=false;
    this.focused.email=false;
    this.focused.birth_date=false;

    this.signinData = {
      username : '',
      password : ''
    };
    this.signupData = {
      username : '',
      password : '',
      email : '',
      birth_date : ''
    };
  }


  onFocus(input: string) {
    this.focused[input as keyof typeof this.focused] = true;
  }

  onBlur(input: string) {
    this.focused[input as keyof typeof this.focused] = false;
  }

  enter(signInData : SignIn) {
    let token = this.authService.signIn(signInData).subscribe({
      next: (response) => {
        console.log("signed in successfully")
        console.log("token: "+response.token)
        localStorage.setItem("token" , response.token);
        this.router.navigate(["games-list"]);
      },
      error: (err) => {
        console.log("couldn't sign in");
        console.log(err);
      }
    })
  }

  register(signUpData : SignUp) {
    let token = this.authService.signUp(signUpData).subscribe({
      next: (response) => {
        console.log("signed in successfully")
        console.log("token: "+response.token)
        localStorage.setItem("token" , response.token);
        this.router.navigate(["games-list"]);
      },
      error: (err) => {
        console.log("couldn't sign in");
        console.log(err);
      }
    })
  }
}
