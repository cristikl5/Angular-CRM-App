import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {Router} from "@angular/router";
import firebase from "firebase";
import auth = firebase.auth;
import {User} from "./user";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  isLoggedIn = false;
  user: User

  constructor(private firebaseAuth: AngularFireAuth,
              private router: Router) {
    this.firebaseAuth.authState.subscribe((userRef) => {
      this.user = userRef;
    })


  }

  async signIn(email: string, password: string) {
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this.isLoggedIn = true
        localStorage.setItem('user', JSON.stringify(res.user))
      })
  }

  async signUp(email: string, password: string) {
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.isLoggedIn = true
        localStorage.setItem('user', JSON.stringify(res.user))
      })
  }

  logOut() {
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
  }


  async signInWithGoogle() {
    await this.firebaseAuth.signInWithPopup(new auth.GoogleAuthProvider()).then(res => {
      this.isLoggedIn = true;
      localStorage.setItem('user', JSON.stringify(res.user))
    },()=>{
    })
  }


}

