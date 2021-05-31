import {Component, OnInit, ViewChild} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {ApiService} from "../../services/api.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {AddUserDialogComponent} from "../dialogs/add-user-dialog/add-user-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {DeleteUserDialogComponent} from "../dialogs/delete-user-dialog/delete-user-dialog.component";
import {LogoutDialogComponent} from "../dialogs/logout-dialog/logout-dialog.component";


@Component({
  selector: 'app-dashboard-table',
  templateUrl: './dashboard-table.component.html',
  styleUrls: ['./dashboard-table.component.scss']
})
export class DashboardTableComponent implements OnInit {
  users: IUsers[];
  displayColumns: string[] = ['Nr', 'Name', 'Username', 'Email', 'City', 'Actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  page = 0;
  userId: number
  isLoading = false;

  constructor(private authService: AngularFireAuth,
              private router: Router,
              private usersService: ApiService,
              private toastr: ToastrService,
              private dialog: MatDialog) {
  }


  ngOnInit(): void {
    this.getUsers();
  }


  getUsers() {
    this.isLoading = true;
    this.usersService.getUsers().subscribe((data: any) => {
      this.users = data;
    }, (error: HttpErrorResponse) => {
      console.log(error.message)
      this.toastr.error('Something went wrong', 'Oops!', {timeOut: 3000})
    })
  }

  deleteUser(userId) {
    this.isLoading = true;
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      disableClose: true,
      autoFocus: true,
      data: {
        userId
      }
    })
    dialogRef.afterClosed().subscribe((result) => {
      this.isLoading = false;
      if (result) {
        this.users = this.users.filter((item) => {
          if (item.id !== userId) {
            return item
          }
        })
      }
    })
  }

  addUser() {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {})
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {

      }
    })
  }


  logOut() {
    this.isLoading = true;
    const dialogRef = this.dialog.open(LogoutDialogComponent, {
      disableClose: true
    })
    dialogRef.afterClosed().subscribe((result) => {
      this.isLoading = false
      if (result) {
        this.authService.signOut()
          .then(() => this.router.navigate(['/login']));
      }
    })
  }
}


export interface IUsers {
  id: number
  name: string
  username: string
  email: string
  address: string
}
