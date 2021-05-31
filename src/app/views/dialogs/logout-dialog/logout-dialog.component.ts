import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrls: ['./logout-dialog.component.scss']
})
export class LogoutDialogComponent implements OnInit {

  constructor(private matDialogRef: MatDialogRef<LogoutDialogComponent>) {
  }

  ngOnInit(): void {
  }

  confirm() {
    this.matDialogRef.close(true)
  }
}
