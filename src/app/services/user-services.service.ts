import { Injectable } from '@angular/core';
import { User } from '../userModel/user.model';
import { Router } from '@angular/router';
import { Observable, Subject, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserServicesService {
  constructor(private route: Router, private httpClient: HttpClient) {}

  url = 'http://localhost:3000/api/users';
  subject = new Subject<any>();

  addUSer(data: any): Observable<any> {
    return this.httpClient
      .post(`${this.url}/`, data)
      .pipe(catchError(this.handleError));
  }

  updateUser(userId: string, data: any): Observable<any> {
    return this.httpClient
      .put(`${this.url}/${userId}`, data)
      .pipe(catchError(this.handleError));
  }

  DeleteUser(userId: string): Observable<any> {
    return this.httpClient
      .delete(`${this.url}/${userId}`)
      .pipe(catchError(this.handleError));
  }

  getUsersList(): Observable<User[]> {
    return this.httpClient
      .get<User[]>(`${this.url}/`)
      .pipe(catchError(this.handleError));
  }

  getUserById(userId: any): Observable<User> {
    return this.httpClient
      .get<User>(`${this.url}/${userId}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      console.error('An error occured: ', error.error.message);
      errorMessage = `An error occured: ${error.error.message}`;
      this.subject.next(errorMessage);
    } else {
      // Backend Side
      console.error(
        `Backend returned code ${error.status} ` + `body was: ${error}`
      );
      errorMessage =
        `Backend returned code ${error.status} ` + `body was: ${error}`;
      this.subject.next(errorMessage);
    }

    return throwError(() => console.error(new Error('Somthing bad happend; please try again later,' + errorMessage)));
  }
}
