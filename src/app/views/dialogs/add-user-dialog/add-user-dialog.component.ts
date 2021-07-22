import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../services/api.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss']
})
export class AddUserDialogComponent implements OnInit {
  addForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddUserDialogComponent>,
              private formBuilder: FormBuilder,
              private apiService: ApiService,
              private router: Router,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }

  formGroup(): void {
    this.addForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      city: new FormControl('', Validators.required)
    });
  }

  addUser(): void {
    this.apiService.createUser(this.addForm.value).subscribe((data) => {

    });
  }

  onSubmit(): void {
    this.dialogRef.close(true);
  }
}
