import { Component } from '@angular/core'
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import  socialIcons  from './../../../assets/data/pages/social-items.json';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../../models/auth/login-request.model';
import { CookieService } from 'ngx-cookie-service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { concatMap } from 'rxjs';

@Component({
    templateUrl: './login-1.component.html'
})

export class Login1Component {
  loginForm: FormGroup;
  isLoading = false;
  error = false;
  socialMediaButtons = socialIcons.socialMediaButtons;

  validateForm!: UntypedFormGroup;

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private location: Location,
    private authService: AuthService,
    private cookieService: CookieService,
    private msg: NzMessageService) {}

    startShowMessages(): void {
      this.msg
        .loading('Action in progress', { nzDuration: 2500 })
        .onClose!.pipe(
          concatMap(() => this.msg.success('Loading finished', { nzDuration: 2500 }).onClose!),
          concatMap(() => this.msg.info('Loading finished is finished', { nzDuration: 2500 }).onClose!)
        )
        .subscribe(() => {
          console.log('All completed!');
        });
    }

  submitForm(): void {
    if (this.validateForm.valid) {
      var request:LoginRequest = {
        Username : this.validateForm.value.username,
        Password : this.validateForm.value.password
      };
      
     this.authService.Login(request)
     .subscribe({
      
      error(err) {
        console.log('error',this.msg);
      },
      next:(response)=>{
        //set auth cookie
        
        console.log(response);
        this.cookieService.set('Authorization',`Bearer ${response.token}`, undefined, '/', undefined, true, 'Strict');
        this.authService.setUser({
          nombre :response.nombre,
          apellidos: response.apellidos,
          email: response.email,
          roles: response.roles,
          username: response.username
        });

        this.router.navigateByUrl('/administrador/dashboard').then(() => {
          window.location.reload();
        });;
        
      }
     });
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() =>
      this.validateForm.controls.checkPassword.updateValueAndValidity()
    );
  }

  passwordVisible = false;
  password?: string;

  ngOnInit(): void {
    this.startShowMessages();
    this.authService.TestApi()
    .subscribe({
      next:(response)=>{
        console.log(response);
      }
    });
    this.validateForm = this.fb.group({
      username: ['admin@imss.gob.mx', [Validators.required]],
      password: ['password', [Validators.required]],
      remember: [true],
    });
  }
}
