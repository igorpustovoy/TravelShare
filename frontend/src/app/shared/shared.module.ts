import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { NgxMaskModule } from 'ngx-mask';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from './loading/loading.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ScrollPositionDirective } from './directives/scroll-position.directive';


@NgModule({
  declarations: [
    InputComponent,
    LoadingComponent,
    ScrollPositionDirective,
  ],
  imports: [
    CommonModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  exports: [
    InputComponent,
    LoadingComponent,
    ScrollPositionDirective
  ]
})
export class SharedModule { }
