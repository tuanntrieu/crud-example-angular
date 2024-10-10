import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LogInRequest } from '../models/request/login';
import { catchError, Observable, of, throwError } from 'rxjs';
import { CommonResponse } from '../models/response/common-response';
import { UpdateRole } from '../models/request/update-role';
import { PermissionResponse } from '../models/response/persmission-response';
import { ChangePermission } from '../models/request/change-permission';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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

  findAllRole(): Observable<CommonResponse<any>> {
    return this.httpClient.post<CommonResponse<string[]>>(`${this.baseURL}/auth/find-all-role`, {});
  }

  loadAllPermission(): Observable<CommonResponse<any>> {
    return this.httpClient.post<CommonResponse<PermissionResponse>>(`${this.baseURL}/roles/load-permissions`, {});
  }

  loadPermissionByRole(updateRole: UpdateRole): Observable<CommonResponse<any>> {
    return this.httpClient.post<CommonResponse<PermissionResponse>>(`${this.baseURL}/auth/load-permission-by-role-name`, updateRole);
  }

  changePermission(changePer: ChangePermission): Observable<CommonResponse<any>> {
    return this.httpClient.post<CommonResponse<string>>(`${this.baseURL}/roles/update-permission`, changePer);
  }

  updateRole(updateRole: UpdateRole): Observable<CommonResponse<any>> {
    return this.httpClient.post<CommonResponse<string>>(`${this.baseURL}/roles/update-role`, updateRole);
  }

  checkPermissions(permission: string): Promise<boolean> {
    return new Promise((resolve) => {
      const token = localStorage.getItem("access_token");
      if (token) {
        const tokenDecode = jwtDecode(token) as { auth: string };

        if (tokenDecode.auth) {
          const role: UpdateRole = new UpdateRole();
          role.role = tokenDecode.auth;

          this.loadPermissionByRole(role).subscribe(
            (res) => {
              const permissions = res.data.map((element: { namePermission: string; }) => element.namePermission);
              resolve(permissions.includes(permission));
            },
            (error) => {
              console.error('Error loading permissions', error);
              resolve(false);
            }
          );
        } else {
          resolve(false);
        }
      } else {
        resolve(false);
      }
    });
  }



}
class LoginResponse {
  tokenType!: string;
  username!: string;
  accessToken!: string;
  role!: string;
  permissions!: string[];
}


