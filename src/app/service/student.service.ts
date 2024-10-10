import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { PaginationResponse } from '../models/response/pagination-response';
import { Student } from '../models/student';

import { CommonResponse } from '../models/response/common-response';
import { StudentCreate } from '../models/request/student-create';
import { StudentDelete } from '../models/request/student-delete';
import { StudentSearch } from '../models/request/student-search';
import { StudentUpdate } from '../models/request/student-update';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseURL = "http://localhost:8080/api/v1/students";

  constructor(private httpClient: HttpClient) { }

  searchStudents(studentSearch: StudentSearch): Observable<CommonResponse<PaginationResponse<Student>>> {
    return this.httpClient.post<CommonResponse<PaginationResponse<Student>>>(`${this.baseURL + "/search-student"}`, studentSearch);
  }

  createStudent(studentCreate: StudentCreate): Observable<CommonResponse<string>> {
    return this.httpClient.post<CommonResponse<string>>(`${this.baseURL + "/create-student"}`, studentCreate).pipe(
      catchError((error) => {
        return of({
          status: error.error.status,
          statusCode: error.error.statusCode,
          message: error.error.message
        } as CommonResponse<string>);
      }
      ));
  }

  updateStudent(studentUpdate: StudentUpdate): Observable<CommonResponse<string>> {
    return this.httpClient.post<CommonResponse<string>>(`${this.baseURL + "/update-student"}`, studentUpdate);
  }

  deleteStudent(studentDelete: StudentDelete): Observable<CommonResponse<string>> {
    return this.httpClient.post<CommonResponse<string>>(`${this.baseURL + "/delete-student"}`, studentDelete);
  }

}
