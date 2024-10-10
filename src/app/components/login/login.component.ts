import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { LogInRequest } from '../../models/request/login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form!: FormGroup;
  isFormSubmitted: boolean = false;
  errorMessage!: string;
  constructor(private authService: AuthService, private router: Router) {
    this.form = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    });
  }

  loginRequest: LogInRequest = new LogInRequest();
  onSubmit() {
    this.isFormSubmitted = true;
    if (this.form.valid) {
      localStorage.removeItem("access_token")
      this.authService.login(this.loginRequest).subscribe(
        response => {
          if (response.statusCode == 200) {
            localStorage.setItem
            localStorage.setItem("access_token", response.data.accessToken);
            this.router.navigate(['/home']);
          } else if (response.statusCode == 400) {
            this.errorMessage = response.message;
          }
        }
      )
    }
  }
}
