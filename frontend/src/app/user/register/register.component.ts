import { UserService } from './../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterValidators } from '../validators/register-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private http: HttpClient, private userService: UserService) { }

  ngOnInit(): void {
  }

  registerForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    age: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(13),
      Validators.max(120)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required
    ]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(11)
    ])
  }, [RegisterValidators.match('password', 'confirmPassword')]);

  async register() {
    try {
      console.log(this.registerForm.value);
      // this.userService.createUser(this.registerForm.value);
    } catch (error) {
      console.error(error);
    }
  }

}
