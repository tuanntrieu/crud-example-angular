import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationResponse } from '../models/pagination-response';
import { Student } from '../models/student';
import { StudentSearch } from '../models/student-search';
import { StudentCreate } from '../models/student-create';
import { StudentDelete } from '../models/student-delete';
import { StudentUpdate } from '../models/student-update';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseURL = "http://localhost:8080/api/v1";

  constructor(private httpClient: HttpClient) { }

  searchStudents(studentSearch: StudentSearch): Observable<PaginationResponse<Student>> {
    return this.httpClient.post<PaginationResponse<Student>>(`${this.baseURL + "/search"}`, studentSearch);
  }

  createStudent(studentCreate: StudentCreate): Observable<Student> {
    return this.httpClient.post<Student>(`${this.baseURL + "/create-student"}`, studentCreate);
  }

  updateStudent(studentUpdate: StudentUpdate): Observable<Student> {
    return this.httpClient.post<Student>(`${this.baseURL + "/update-student"}`, studentUpdate);
  }

  deleteStudent(studentDelete: StudentDelete): Observable<string> {
    return this.httpClient.post(`${this.baseURL + "/delete-student"}`, studentDelete, { responseType: 'text' });
  }

}
