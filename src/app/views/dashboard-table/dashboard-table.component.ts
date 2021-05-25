import {Component, OnInit} from '@angular/core';
import {FirebaseService} from "../../shared/services/firebase.service";

@Component({
  selector: 'app-dashboard-table',
  templateUrl: './dashboard-table.component.html',
  styleUrls: ['./dashboard-table.component.scss']
})
export class DashboardTableComponent implements OnInit {

  constructor(public authService: FirebaseService) {
  }

  ngOnInit(): void {
  }

  logOut() {
    this.authService.logOut();
  }

}
