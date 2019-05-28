import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

// // const httpOptions = {
// //   headers: new HttpHeaders({
// //     Authorization: 'Bearer ' + localStorage.getItem('token')
// //   }) Alternative Public In App.module "JwtModule" 9. Using Auth0 JwtModule to send up jwt tokens automatically
// };
@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'users');
  }

  // getUsers(): Observable<User[]> {
  //   return this.http.get<User[]>(this.baseUrl + 'users', httpOptions);
  // }
  getUser(id): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'users/' + id);
  }
}
