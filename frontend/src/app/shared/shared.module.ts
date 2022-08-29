import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { NgxMaskModule } from 'ngx-mask';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    InputComponent
  ],
  imports: [
    CommonModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule
  ],
  exports: [
    InputComponent
  ]
})
export class SharedModule { }
