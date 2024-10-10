import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../../service/student.service';

import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from "../header/header.component";
import { StudentCreate } from '../../models/request/student-create';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-create-student',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-student.component.html',
  styleUrl: './create-student.component.scss'
})
export class CreateStudentComponent {

  form!: FormGroup;
  isFormSubmitted: boolean = false;
  errorMessage: string = '';
  

  constructor(private studentServie: StudentService, private router: Router, private toastr: ToastrService) {
    this.form = new FormGroup({
      name: new FormControl("", [Validators.required]),
      address: new FormControl("", [Validators.required]),
      gender: new FormControl("", [Validators.required]),
      birthday: new FormControl("", [Validators.required]),
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      rePassword: new FormControl("", [Validators.required])
    });
  }

  studentCreate: StudentCreate = new StudentCreate();

  createStudent() {
    this.studentServie.createStudent(this.studentCreate).subscribe((response) => {
      if(response.statusCode==200){
        this.goToHome(response.data);
      } 
      else{
        this.errorMessage=response.message;
      }
    }
    )
  }

  goToHome(message: string) {
    this.toastr.success(message, "Susscess")
    this.router.navigate(['/home']);
  }

  onSubmit() {
    this.isFormSubmitted = true;
    if (this.form.valid) {
      this.createStudent();
    }
  }
}
