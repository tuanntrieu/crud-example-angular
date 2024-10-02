import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LogInRequest } from '../models/request/login';
import { catchError, Observable, of, throwError } from 'rxjs';
import { CommonResponse } from '../models/response/common-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn: boolean = false;

  constructor(private httpClient: HttpClient) { }

  private baseURL = "http://localhost:8080/api/v1";

  login(login: LogInRequest): Observable<any> {
    return this.httpClient.post<CommonResponse<LoginResponse>>(`${this.baseURL}/auth/login`, login).pipe(
      catchError((error) => {
        return of({
          status: error.error.status,
          statusCode: error.error.statusCode,
          message: error.error.message
        } as CommonResponse<string>);
      })
    );
  }

  logout(): Observable<CommonResponse<string>> {
    return this.httpClient.post<CommonResponse<string>>(`${this.baseURL}/logout`, {});
  }

}
class LoginResponse {
  tokenType!: string;
  username!: string;
  accessToken!: string;
}




