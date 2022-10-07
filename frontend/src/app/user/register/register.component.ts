import { UserService } from '../services/user.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterValidators } from '../validators/register-validators';
import { UsernameTaken } from '../validators/username-taken';
import { Subject, takeUntil } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnDestroy {
  private readonly onDestroy = new Subject<void>();
  public registrationStatus: 'loading' | 'success' | 'error' | null = null;

  constructor(
    private userService: UserService,
    private usernameTaken: UsernameTaken,
    private dialogRef: MatDialogRef<LoginDialogComponent>
  ) {}

  registerForm = new FormGroup(
    {
      username: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
        [this.usernameTaken.validate]
      ),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
        ),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
      ]),
    },
    [RegisterValidators.match('password', 'confirmPassword')]
  );

  register() {
    this.registrationStatus = 'loading';
    console.log(this.registerForm.value);
    this.userService
      .createUser({
        username: this.registerForm.value.username as string,
        email: this.registerForm.value.email as string,
        password: this.registerForm.value.password as string,
        phoneNumber: this.registerForm.value.phoneNumber as string,
      })
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res) => {
        console.log('RESPONSE:', res);
        if (res.status === 'error') {
          this.registrationStatus = 'error';
        }
        if (res.status === 'ok') {
          localStorage.setItem('auth_token', res.token as string);
          localStorage.setItem('username', res.userInfo?.username as string);
          localStorage.setItem('email', res.userInfo?.email as string);
          localStorage.setItem(
            'phoneNumber',
            res.userInfo?.phoneNumber as string
          );
          localStorage.setItem('user_id', res.userInfo?.id as string);
          
          window.dispatchEvent( new Event('storage') );

          this.registrationStatus = 'success';
          setTimeout(() => {
            this.dialogRef.close();
          }, 1000);
        }
      });
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }
}
