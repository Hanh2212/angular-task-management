import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Toast } from 'src/app/core/helper/toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isSignUp = false;
  loginForm!: FormGroup;
  signupForm!: FormGroup;

  constructor(private router: Router, private fb: FormBuilder,
    private authService: AuthenticationService,
    private toast: Toast) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  login(): void {
    for (const key in this.loginForm.controls) {
      this.loginForm.controls[key].markAsDirty();
      this.loginForm.controls[key].updateValueAndValidity();
    }
    if (this.loginForm.invalid) { return; }

    this.authService.login(this.loginForm.value)
      .subscribe({
        next: (data) => {
          if (data) {
            this.authService.setCredentials(data);
            this.toast.customToastr('success', data.message);
            this.router.navigate(['/tasks']);
          }
        },
        error: error => {
          this.toast.customToastr('error', error.message);
          this.loginForm.reset();
        }
      })
  }

  signUp(): void {
    for (const key in this.signupForm.controls) {
      this.signupForm.controls[key].markAsDirty();
      this.signupForm.controls[key].updateValueAndValidity();
    }
    if (this.signupForm.invalid) { return; }

    this.authService.signUp(this.signupForm.value)
      .subscribe({
        next: (data) => {
          if (data) {
            this.toast.customToastr('success', data.message);
          }
        }, error: (error) => {
          this.toast.customToastr('error', error.message);
          this.signupForm.reset();
        }
      });
  }

}
