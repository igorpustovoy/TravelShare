import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

const fadeIn = trigger('fadeIn', [
  state('in', style({ opacity: 1 })),
  transition('void => *', [style({ opacity: 0}), animate('1.3s ease-out')]),
]);

const lettersIn = trigger('lettersIn', [
  state('in', style({ opacity: 1, 'letter-spacing': 'normal' })),
  transition('void => *', [style({ opacity: 0, 'letter-spacing': '15px'}), animate('1.2s ease-out')]),
]);
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fadeIn, lettersIn]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
