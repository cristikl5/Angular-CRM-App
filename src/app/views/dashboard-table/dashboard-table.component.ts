import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {ApiService} from "../../services/api.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSort, Sort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {ToastrService} from "ngx-toastr";
import {MatPaginator} from "@angular/material/paginator";


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

  constructor(private authService: AngularFireAuth,
              private router: Router,
              private usersService: ApiService,
              private toastr: ToastrService) {
  }


  ngOnInit(): void {
    this.getUsers();
  }


  getUsers() {
    this.usersService.getUsers().subscribe((data: any) => {
      this.users = data;
      console.log(data)
    }, (error: HttpErrorResponse) => {
      console.log(error)
      this.toastr.error('Something went wrong', 'Oops!', {timeOut: 3000})
    })
  }

  deleteUser(userId) {
    this.usersService.deleteUser({userId: userId}).subscribe(() => {
      this.users.filter(item => {
        if (item.id !== userId) {
          return item;
        }
      })
      this.router.navigate(['/dashboard'])
      this.toastr.success('User Deleted', 'Success!', {timeOut: 3000})
    }, (error: HttpErrorResponse) => {
      console.log(error)
    })
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
