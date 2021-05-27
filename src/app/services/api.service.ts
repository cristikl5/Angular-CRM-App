import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";


const users = 'https://jsonplaceholder.typicode.com/users';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  getUsers(...filtersOrSorts): Observable<Object> {
    let params = new HttpParams();
    if (filtersOrSorts && filtersOrSorts.length > 0) {
      filtersOrSorts.map((filter) => {
        const keyFilter = Object.keys(filter);
        const valueFilter = filter[keyFilter[0]];
        if (valueFilter !== null && valueFilter !== '') {
          params = params.append(`${keyFilter}`, valueFilter);
        }
      });
    }
    return this.http.get(users, {params: params});
  }

  addUser(...filtersOrSorts): Observable<Object> {
    let params = new HttpParams();
    if (filtersOrSorts && filtersOrSorts.length > 0) {
      filtersOrSorts.map((filter) => {
        const keyFilter = Object.keys(filter);
        const valueFilter = filter[keyFilter[0]];
        if (valueFilter !== null && valueFilter !== '') {
          params = params.append(`${keyFilter}`, valueFilter);
        }
      });
    }
    return this.http.post(users, {params: params});
  }

  deleteUser(...filtersOrSorts): Observable<Object> {
    let params = new HttpParams();
    if (filtersOrSorts && filtersOrSorts.length > 0) {
      filtersOrSorts.map((filter) => {
        const keyFilter = Object.keys(filter);
        const valueFilter = filter[keyFilter[0]];
        if (valueFilter !== null && valueFilter !== '') {
          params = params.append(`${keyFilter}`, valueFilter);
        }
      });
    }
    return this.http.delete(users, {params: params});
  }



}
