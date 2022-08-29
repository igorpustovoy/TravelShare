import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() type: string = 'text';
  @Input() control: FormControl = new FormControl();
  @Input() placeholder: string = '';
  @Input() format: string = '';

  constructor() {}

  ngOnInit(): void {}
}
