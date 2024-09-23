import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../../service/student.service';
import { StudentCreate } from '../../models/student-create';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';


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

  constructor(private studentServie: StudentService, private router: Router, private fb: FormBuilder) {
    this.form = new FormGroup({
      name: new FormControl("",[Validators.required]),
      address:new FormControl("",[Validators.required]),
      gender:new FormControl("",[Validators.required]),
      birthday:new FormControl("",[Validators.required])
    });
  }

  studentCreate: StudentCreate = new StudentCreate();

  createStudent() {
    this.studentServie.createStudent(this.studentCreate).subscribe(() => {
      this.goToHome();
    }
    )
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    this.isFormSubmitted =  true;
    if (this.form.valid) {
      this.createStudent();
    }
  }
}
