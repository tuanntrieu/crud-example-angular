import { Component } from '@angular/core';
import { PaginationResponse } from '../../models/pagination-response';
import { Student } from '../../models/student';
import { StudentSearch } from '../../models/student-search';
import { StudentService } from '../../service/student.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { StudentDelete } from '../../models/student-delete';
import { StudentUpdate } from '../../models/student-update';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.scss',
})
export class StudentListComponent {
  page: PaginationResponse<Student> = new PaginationResponse<Student>();

  studentSearch: StudentSearch = new StudentSearch();

  studentDelete: StudentDelete = new StudentDelete();

  studentUpdate: StudentUpdate = new StudentUpdate();

  constructor(private studentServie: StudentService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.studentSearch.pageSize = 7;
    this.studentSearch.pageNo = 0;
    this.searchStudent();
  }

  searchStudent() {
    this.studentServie.searchStudents(this.studentSearch).subscribe(
      response => {
        this.page.items = response.items;
        this.page.totalElements = response.totalElements;
        this.page.pageNo = response.pageNo;
        this.page.pageSize = response.pageSize;
        this.page.totalPages = response.totalPages;
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

  onPageChange(pageNo: number) {
    this.studentSearch.pageNo = pageNo;
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
    this.studentServie.updateStudent(this.studentUpdate).subscribe(
      () => {
        this.searchStudent();
      }
    );
  }


}
