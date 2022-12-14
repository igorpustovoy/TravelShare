import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { InputComponent } from '../shared/input/input.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { LoadingComponent } from '../shared/loading/loading.component';
import { UserProfileComponent } from './user-profile/user-profile.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LoginDialogComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
  ],
  exports: [
    RegisterComponent,
    LoginComponent,
    LoginDialogComponent
  ]
})
export class UserModule { }
