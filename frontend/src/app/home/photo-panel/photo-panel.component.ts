import { Component, OnInit } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-photo-panel',
  templateUrl: './photo-panel.component.html',
  styleUrls: ['./photo-panel.component.scss'],
})
export class PhotoPanelComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.initScrollingAnimations();
  }

  initScrollingAnimations() {
    gsap.fromTo(
      '.imageContainer',
      {
        y: 100,
        autoAlpha: 0,
        opacity: 0,
      },
      {
        autoAlpha: 1,
        duration: 1.5,
        y: 0,
        opacity: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.imageContainer',
        },
      }
    );
    gsap.fromTo('.cameraImage', {
      y: 200,
    }, {
      y: -200,
      scrollTrigger: {
        trigger: '.cameraImage',
        scrub: true,
      },
    });
  }
}
