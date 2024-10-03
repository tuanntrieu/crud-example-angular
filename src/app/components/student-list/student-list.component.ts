import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginationResponse } from '../../models/response/pagination-response';
import { Student } from '../../models/student';

import { StudentService } from '../../service/student.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';

import { HeaderComponent } from '../header/header.component';
import { StudentDelete } from '../../models/request/student-delete';
import { StudentSearch } from '../../models/request/student-search';
import { StudentUpdate } from '../../models/request/student-update';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe, ReactiveFormsModule, HeaderComponent, NgxPaginationModule],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.scss',
})
export class StudentListComponent {

  page: PaginationResponse<Student> = new PaginationResponse<Student>();

  studentSearch: StudentSearch = new StudentSearch();

  studentDelete: StudentDelete = new StudentDelete();

  studentUpdate: StudentUpdate = new StudentUpdate();

  updateForm!: FormGroup;

  isFormSubmitted: boolean = false;

  constructor(private studentServie: StudentService, private datePipe: DatePipe) {
    this.updateForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      address: new FormControl("", [Validators.required]),
      gender: new FormControl("", [Validators.required]),
      birthday: new FormControl("", [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.studentSearch.pageSize = 7;
    this.studentSearch.pageNo = 0;
    this.searchStudent();
  }

  searchStudent() {
    this.studentServie.searchStudents(this.studentSearch).subscribe(
      response => {
        console.log(response);

        this.page.items = response.data.items;
        this.page.totalElements = response.data.totalElements;
        this.page.pageNo = response.data.pageNo;
        this.page.pageSize = response.data.pageSize;
        this.page.totalPages = response.data.totalPages;
      }
    );
  }
  onSort(sortBy: string) {
    this.studentSearch.sortBy = sortBy;
    this.searchStudent();
  }
  onSearch() {
    this.searchStudent();
  }

  onPageChange(event: number) {
    this.studentSearch.pageNo = event-1;
    this.searchStudent();
  }
  onDelete() {
    this.studentServie.deleteStudent(this.studentDelete).subscribe(
      () => {
        this.searchStudent();
      }
    );
  }
  updateClick(student: Student) {
    this.studentUpdate.id = student.id;
    this.studentUpdate.name = student.name;
    this.studentUpdate.address = student.address;
    this.studentUpdate.gender = student.gender;
    this.studentUpdate.birthdayString = this.datePipe.transform(student.birthday, 'yyyy-MM-dd') ?? '';
    console.log(this.studentUpdate);
  }
  onUpdate() {
    this.isFormSubmitted = true;
    if (this.updateForm.valid) {
      this.studentServie.updateStudent(this.studentUpdate).subscribe(
        () => {
          this.searchStudent();
        }
      );
    }
  }



}
