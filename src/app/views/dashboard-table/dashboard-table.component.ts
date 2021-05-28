import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {ApiService} from "../../services/api.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSort, Sort} from "@angular/material/sort";
import {ToastrService} from "ngx-toastr";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DeleteUserDialogComponent} from "../dialogs/delete-user-dialog/delete-user-dialog.component";
import {AddUserDialogComponent} from "../dialogs/add-user-dialog/add-user-dialog.component";


@Component({
  selector: 'app-dashboard-table',
  templateUrl: './dashboard-table.component.html',
  styleUrls: ['./dashboard-table.component.scss']
})
export class DashboardTableComponent implements OnInit {
  users: IUsers[];
  displayColumns: string[] = ['Nr', 'Name', 'Username', 'Email', 'City', 'Actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  page = 0;
  id: number;
  name: string;

  constructor(private authService: AngularFireAuth,
              private router: Router,
              private usersService: ApiService,
              private toastr: ToastrService,
              public dialog: MatDialog) {
  }


  ngOnInit(): void {
    this.getUsers();
  }


  getUsers() {
    this.usersService.getUsers().subscribe((data: any) => {
      this.users = data;
      console.log(data)
    }, (error: HttpErrorResponse) => {
      console.log(error.message)
      this.toastr.error('Something went wrong', 'Oops!', {timeOut: 3000})
    })
  }

  deleteUser(userId) {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      width: '250px',
      data: {userId},
    })
    dialogRef.afterClosed().subscribe((data) => {
      this.users = this.users.filter((data) => {
        if (data.id !== userId) {
          return data;
        }
      })
    }, (error: HttpErrorResponse) => {
      console.log(error);
    })
  }

  addUser() {
    const dialogRef = this.dialog.open(AddUserDialogComponent,{
      width:'500px',
      height:'500px'
    })
    dialogRef.afterClosed().subscribe((data)=>{

    })
  }


  editUser() {

  }


  logOut() {
    this.authService.signOut()
      .then(() => this.router.navigate(['/login']));
  }


}


interface IUsers {
  id: number
  name: string
  username: string
  email: string
  address: string
}
