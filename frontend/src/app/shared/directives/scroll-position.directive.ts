import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScrollPosition]',
})
export class ScrollPositionDirective {
  constructor(private element: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const position = (event.target as Document).scrollingElement?.scrollTop;

    if(position === 0) {
      this.renderer.addClass(this.element.nativeElement, 'navbar-transparent');
    } else {
      this.renderer.removeClass(this.element.nativeElement, 'navbar-transparent');
    }
  }
}
