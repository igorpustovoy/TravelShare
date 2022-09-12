import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const fadeIn = trigger('fadeIn', [
  state('in', style({ opacity: 1 })),
  transition('void => *', [style({ opacity: 0 }), animate('1.3s ease-out')]),
]);

const lettersIn = trigger('lettersIn', [
  state('in', style({ opacity: 1, 'letter-spacing': 'normal' })),
  transition('void => *', [
    style({ opacity: 0, 'letter-spacing': '15px' }),
    animate('1.2s ease-out'),
  ]),
]);
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fadeIn, lettersIn],
})
export class HomeComponent implements OnInit {
  // @ViewChild('.upperTitleText', { static: true })
  // upperText!: ElementRef<HTMLDivElement>;
  // @ViewChild('.lowerText', { static: true })
  // lowerText!: ElementRef<HTMLDivElement>;

  constructor() {}

  ngOnInit(): void {
    this.initScrollingAnimations();
  }

  initScrollingAnimations() {
    gsap.to('.scrollText', {
      duration: 1,
      color: 'rgb(255, 255, 255, 0)',
      height: 500,
      width: 500,
      scrollTrigger: {
        trigger: '.scrollCircle',
        start: 'bottom bottom',
        scrub: 2,
      },
    });
    gsap.fromTo(
      '.upperTitleText',
      {
        opacity: 0,
      },
      {
        duration: 1,
        opacity: 1,
        ease: 'power1.in',
        scrollTrigger: {
          trigger: '.upperTitleText',
          toggleActions: 'restart none restart none',
        },
      }
    );
    gsap.fromTo(
      '.lowerTitleText',
      {
        opacity: 0,
        'font-size': '4.5rem',
      },
      {
        duration: 1,
        ease: 'power1.out',
        opacity: 1,
        scrollTrigger: {
          trigger: '.lowerTitleText',
          toggleActions: 'restart none restart none',
        },
        'font-size': '3.5rem',
      }
    );
    gsap.to('.image1', {
      y: -80,
      duration: 1,
      scrollTrigger: {
        trigger: '.image1',
        scrub: true,
        // start: 'bottom center',
      },
    });
    gsap.to('.image2', {
      y: -150,
      duration: 1,
      scrollTrigger: {
        trigger: '.image2',
        scrub: true,
        // start: 'bottom center',
      },
    });
    gsap.to('.section', {
      y: -130,
      duration: 1,
      scrollTrigger: {
        trigger: '.leftSide',
        scrub: true,
      },
    });
  }
}
