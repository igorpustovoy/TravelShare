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
    for (let i = 1; i < 7; i++) {
      gsap.fromTo(
        `.imageContainer${i}`,
        {
          y: 100,
          autoAlpha: 0,
          opacity: 0,
        },
        {
          autoAlpha: 1,
          duration: 1.2,
          y: 0,
          opacity: 1,
          // stagger: 0.2,
          scrollTrigger: {
            trigger: `.imageContainer${i}`,
          },
        }
      );
    }
    gsap.fromTo(
      '.cameraImage',
      {
        y: 100,
      },
      {
        y: -130,
        scrollTrigger: {
          trigger: '.cameraImage',
          scrub: true,
        },
      }
    );
  }
}
