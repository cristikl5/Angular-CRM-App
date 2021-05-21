import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FirebaseService} from "../../shared/services/firebase.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: FirebaseService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  onLogin(email, password) {
    this.authService.signIn(email, password).then(() => {
      this.router.navigate(['dashboard'])
    })
  }



  googleLogin() {
    this.authService.signInWithGoogle().then(()=>{
      this.router.navigate(['/dashboard'])
    });
  }
}
