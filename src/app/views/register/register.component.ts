import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/auth";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup

  constructor(
    private auth: AngularFireAuth,
    public fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: new FormControl('', [Validators.email,Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }


  createUser() {
    const {email, password} = this.registerForm.value;
    this.auth.createUserWithEmailAndPassword(email, password).then((user) => {
      this.router.navigate(['/login'])
      this.toastr.success('Account created! Now login', 'Success!', {timeOut: 3000})
    }).catch(()=>{
      this.toastr.error('Something went wrong', 'Oops!', {timeOut: 3000})
    })
  }

}
