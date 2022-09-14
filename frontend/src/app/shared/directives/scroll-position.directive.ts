import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScrollPosition]',
})
export class ScrollPositionDirective {
  previousPosition: number | null = null;

  constructor(private element: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    // console.log(event)
    const position: number = (event.target as Document).scrollingElement?.scrollTop as number;

    if(position === 0) {
      this.renderer.addClass(this.element.nativeElement, 'navbar-transparent');
    } else {
      if (this.previousPosition !== null && this.previousPosition > position) {
      this.renderer.removeClass(this.element.nativeElement, 'navbar-transparent');
    }

    this.previousPosition = position;
  }
}
}
