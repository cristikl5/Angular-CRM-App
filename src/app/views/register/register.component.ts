import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AngularFireAuth} from "@angular/fire/auth";
import firebase from 'firebase/app';
import auth = firebase.auth;
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  roles: any = ['Admin', 'User'];
  registerForm: FormGroup

  constructor(private fb: FormBuilder,
              private auth: AngularFireAuth,
              private router:Router) {
  }

  ngOnInit(): void {
    this.registerFormRef();
  }

  registerFormRef() {
    this.registerForm = this.fb.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  createUser(email,password) {
    this.auth.createUserWithEmailAndPassword(email,password).then((user)=>{
      if (user) {
        this.router.navigate(['/login'])
      }
    })
  }

  logOut() {
    this.auth.signOut();
  }

}
