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
import { ToastrService } from 'ngx-toastr';
import { UpdateRole } from '../../models/request/update-role';
import { AuthService } from '../../service/auth.service';
import { PermissionConstant } from '../../models/permission-constant';


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

  updateRole: UpdateRole = new UpdateRole();

  listRole!: string[];

  canUpdate: boolean = false;
  canDelete: boolean = false;
  canManage: boolean = false;
  canDisplay: boolean = true;

  constructor(private studentServie: StudentService, private datePipe: DatePipe, private toastr: ToastrService, private authService: AuthService) {
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
    Promise.all([
      this.authService.checkPermissions(PermissionConstant.UPDATE_STUDENT),
      this.authService.checkPermissions(PermissionConstant.DELETE_STUDENT),
      this.authService.checkPermissions(PermissionConstant.MANAGE_ROLES)
    ]).then(([update, deletePerm, manage]) => {
      this.canUpdate = update;
      this.canDelete = deletePerm;
      this.canManage = manage;
      this.canDisplay = this.canDelete || this.canUpdate;
      this.searchStudent();
    });
  }

  searchStudent() {
    this.studentServie.searchStudents(this.studentSearch).subscribe(
      response => {
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
    this.studentSearch.pageNo = event - 1;
    this.searchStudent();
  }
  onDelete() {
    this.studentServie.deleteStudent(this.studentDelete).subscribe(
      (response) => {
        this.toastr.warning(response.data, "Success")
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
    this.updateRole.role = student.role;
    this.updateRole.studentId = student.id;
    this.loadRole()
    console.log(this.updateRole.role);

  }
  onUpdate() {
    this.isFormSubmitted = true;
    if (this.updateForm.valid) {
      this.studentServie.updateStudent(this.studentUpdate).subscribe(
        (response) => {
          this.toastr.success(response.data, "Success")
          this.searchStudent();
        }
      );
      if (this, this.canManage) {
        this.authService.updateRole(this.updateRole).subscribe();
      }
    }
  }

  loadRole() {
    this.authService.findAllRole().subscribe(
      (response) => {
        this.listRole = response.data;
      }
    );
  }
  isSelected(role: string): boolean {
    return role === this.updateRole.role;
  }
  onRoleChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.updateRole.role = selectElement.value;

  }



}
