import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [FormsModule, NgIf, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {


  title = 'Gamarena';
  description = 'A Game Arena grouping challenging games for users like <span>wordle</span>, sudoku, twins hunt and more.';

  signinData = {
    username : '',
    password : ''
  };
  signupData = {
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
}
