import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IUsers} from '../views/dashboard-table/dashboard-table.component';
import {catchError} from 'rxjs/operators';


const usersURL = 'https://jsonplaceholder.typicode.com/users';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<Object> {
    return this.http.get(usersURL);
  }

  deleteUser(userId: number): Observable<Object> {
    return this.http.delete(`${usersURL}/${userId}`);
  }

  createUser(user: IUsers): Observable<any> {
    return this.http.post(usersURL, user);
  }

  updateUser(user: IUsers): Observable<Object> {
    return this.http.put(usersURL, usersURL);
  }


}
