import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { PaginationResult } from '../models/pagination';
import { map } from 'rxjs/operators';

// // const httpOptions = {
// //   headers: new HttpHeaders({
// //     Authorization: 'Bearer ' + localStorage.getItem('token')
// //   }) Alternative Public In App.module 'JwtModule' 9. Using Auth0 JwtModule to send up jwt tokens automatically
// };
@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getUsers(page?, itemsPerPage?, userParams?): Observable<PaginationResult<User[]>> {
    console.log('Test1000');
    const paginatedResult: PaginationResult<User[]> = new PaginationResult<User[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (userParams != null) {
      params = params.append('minAge', userParams.minAge);
      params = params.append('maxAge', userParams.maxAge);
      params = params.append('gender', userParams.gender);
      params = params.append('orderBy', userParams.orderBy);

    }
    return this.http
      .get<User[]>(this.baseUrl + 'users', { observe: 'response', params })
      .pipe(
        map(responce => {
          paginatedResult.result = responce.body;
          // console.log('paginatedResult' + paginatedResult.result);
          // console.log('Paginagtion Headers ' + responce.headers.get('Pagination'));
          if (responce.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(
              responce.headers.get('Pagination')
            );
          }
          return paginatedResult;
        })
      );
  }

  // getUsers(): Observable<User[]> {
  //   return this.http.get<User[]>(this.baseUrl + 'users', httpOptions);
  // }
  getUser(id): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'users/' + id);
  }

  updateUser(id: number, user: User) {
    return this.http.put(this.baseUrl + 'users/' + id, user);
  }

  setMainPhoto(userId: number, id: number) {
    return this.http.post(
      this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain',
      {}
    );
  }

  deletePhoto(userId: number, id: number) {
    return this.http.delete(this.baseUrl + 'users/' + userId + '/photos/' + id);
  }
}
