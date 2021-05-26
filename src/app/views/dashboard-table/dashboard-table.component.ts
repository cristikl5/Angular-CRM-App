import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {ApiService} from "../../services/api.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-dashboard-table',
  templateUrl: './dashboard-table.component.html',
  styleUrls: ['./dashboard-table.component.scss']
})
export class DashboardTableComponent implements OnInit {
  users: Users[];
  displayColumns: string[] = ['Name','Username','Email','Address'];

  constructor(private authService: AngularFireAuth,
              private router: Router,
              private usersService: ApiService) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.usersService.getUsers().subscribe((data: any) => {
      this.users = data;
    }, (error: HttpErrorResponse) => {
      console.log(error)
    })
  }


  logOut() {
    this.authService.signOut()
      .then(() => this.router.navigate(['/login']));
  }

}


interface Users {
  id: number
  name: string
  username: string
  email: string
  address: string
}
