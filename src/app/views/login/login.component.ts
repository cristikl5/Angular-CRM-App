import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import firebase from "firebase";
import {AngularFireAuth} from "@angular/fire/auth";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(public authService: AngularFireAuth,
              private router: Router,
              public fb: FormBuilder,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  signIn() {
    const {email, password} = this.loginForm.value
    this.authService.signInWithEmailAndPassword(email, password).then((success) => {
      this.router.navigate(['/dashboard']);
      this.toastr.success('Hello there!', '', {timeOut: 3000})
    }).catch(() => {
      this.toastr.error('Something went wrong', 'Oops!', {timeOut: 3000})
    })
  }


  signInWithGoogle() {
    this.authService.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((user) => {
      this.router.navigate(['/dashboard'])
      this.toastr.success('', 'Hi there!', {timeOut: 3000})
    }).catch(() => {
      this.toastr.error('Something went wrong', 'Oops!', {timeOut: 3000})
    })
  }
}
