import {Injectable, NgZone} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import firebase from 'firebase';
import {User} from "./user";
import {ToastrService} from "ngx-toastr";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  user: User
  userData: any

  constructor(private fireAuth: AngularFireAuth,
              private router: Router) {
    this.fireAuth.authState.subscribe((user) => {
      if (user) {
        this.user = user
        localStorage.setItem('user', JSON.stringify(this.user))
      } else {
        localStorage.setItem('user', null)
      }
    })
  }




  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }


  signIn(email: string, password: string) {
    return this.fireAuth.signInWithEmailAndPassword(email, password).then((result) => {
      console.log('nice it worked', result)
      this.router.navigate(['/dashboard']);
    }).catch((error) => {
      console.log('sadadsas', error)
    })
  }

  signUp(email: string, password: string) {
    return this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log('nice it worked', res)
        this.router.navigate(['/login'])
      }).catch(error => {
        console.log('something went wrong', error)
      })
  }

  logOut() {
    return this.fireAuth.signOut().then(() => {
      this.router.navigate(['/'])
    })
  }


  signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.fireAuth.signInWithPopup(provider).then((result) => {
      console.log('dasdasdasd', result)
      this.router.navigate(['/dashboard'])
    }).catch(error => {
      console.log('something went wrong', error.message)
    })
  }


}

