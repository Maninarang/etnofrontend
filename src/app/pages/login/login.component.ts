import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrMessages } from '../../helpers/toaster.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
@Component({
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  spinner = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toast: ToastrMessages,

  ) {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      this.router.navigate(['/pages/dashboard']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }
  ////// ========================== super admin login function =========================== //////
  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.spinner = true;
    this.authService.login(this.f.email.value, this.f.password.value).subscribe(
      (response: any) => {
        this.spinner = false;
        if (response.message === 'Invalid User') {
          this.toast.showToast(NbToastStatus.DANGER, 'Credentials', 'Invalid User!');
        } else if (response.message === 'Invalid Password') {
          this.toast.showToast(NbToastStatus.DANGER, 'Credentials', 'Invalid Password!');
        } else if (response.message === 'User Detail') {
          this.router.navigate(['/pages/dashboard']);
          localStorage.setItem('authToken', response.body.token);
        }
      }
      ,
      (error) => {
        this.spinner = false;
        this.toast.showToast(NbToastStatus.DANGER, 'Error', 'Something Went Wrong.Please Try Again!');

      });
  }
}
