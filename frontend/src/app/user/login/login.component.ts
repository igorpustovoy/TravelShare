import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  private readonly onDestroy = new Subject<void>();

  constructor(private userService: UserService) { }

  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  })

  login() {
    this.userService.loginUser(this.loginForm.value.username as string, this.loginForm.value.password as string)
    .pipe(takeUntil(this.onDestroy))
    .subscribe(res => {
      if(res.status === 'error') {
        console.log("Incorrect user information")
      } 
      if(res.status === 'ok') {
        localStorage.setItem('auth_token', res.token as string);
        localStorage.setItem('username', res.userInfo?.username as string);
        localStorage.setItem('email', res.userInfo?.email as string);
        localStorage.setItem('phoneNumber', res.userInfo?.phoneNumber as string);
        localStorage.setItem('user_id', res.userInfo?.id as string);
      }
    })
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }

}
