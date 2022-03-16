import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Toast } from 'src/app/core/helper/toastr';

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
    this.toast.customToastr('success', 'Đăng nhập thành công');
    this.router.navigate(['/tasks']);
  }

  signUp(): void {
    console.log(this.signupForm.value);
  }

}
