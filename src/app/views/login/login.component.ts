import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase/app';
import {FirebaseService} from "../../shared/services/firebase.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: FirebaseService) {
  }

  ngOnInit(): void {

  }

  onLogin(email, password) {
    this.authService.signIn(email, password);
  }


  onSignUp(email, password) {
    this.authService.signUp(email, password)
  }

  googleLogin() {
    this.authService.signInWithGoogle();
  }
}
