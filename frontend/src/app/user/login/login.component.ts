import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  private readonly onDestroy = new Subject<void>();
  loginStatus: 'loading' | 'success' | 'error' | null = null;
  // @Input() dialogRef: any;

  constructor(
    private userService: UserService,
    private dialogRef: MatDialogRef<LoginDialogComponent>
  ) {}

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  login() {
    this.loginStatus = 'loading';

    this.userService
      .loginUser(
        this.loginForm.value.username as string,
        this.loginForm.value.password as string
      )
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res) => {
        if (res.status === 'error') {
          console.log('Incorrect user information');
          this.loginStatus = 'error';
        }
        if (res.status === 'ok') {
          // console.log(res);
          this.loginStatus = 'success';
          localStorage.setItem('auth_token', res.token as string);
          localStorage.setItem('username', res.userInfo?.username as string);
          localStorage.setItem('email', res.userInfo?.email as string);
          localStorage.setItem(
            'phoneNumber',
            res.userInfo?.phoneNumber as string
          );
          localStorage.setItem('user_id', res.userInfo?.id as string);

          window.dispatchEvent( new Event('storage') );

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
