import { UserService } from '../services/user.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterValidators } from '../validators/register-validators';
import { UsernameTaken } from '../validators/username-taken';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnDestroy {
  private readonly onDestroy = new Subject<void>();

  constructor(
    private userService: UserService,
    private usernameTaken: UsernameTaken
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
      age: new FormControl<number | null>(null, [
        Validators.required,
        Validators.min(13),
        Validators.max(120),
      ]),
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
    console.log(this.registerForm.value);
    this.userService
      .createUser({
        username: this.registerForm.value.username as string,
        email: this.registerForm.value.email as string,
        age: this.registerForm.value.age as number,
        password: this.registerForm.value.password as string,
        phoneNumber: this.registerForm.value.phoneNumber as string,
      })
      .pipe(takeUntil(this.onDestroy))
      .subscribe(res => {
        console.log(res);
      });
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }
}
