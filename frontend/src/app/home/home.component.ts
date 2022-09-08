import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

const fadeIn = trigger('fadeIn', [
  state('in', style({ opacity: 1 })),
  transition('void => *', [style({ opacity: 0}), animate('1s ease-in')]),
])

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fadeIn]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
