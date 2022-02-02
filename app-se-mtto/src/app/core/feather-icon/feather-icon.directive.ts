import { Directive, AfterViewInit } from '@angular/core';
import feather from 'feather-icons';

@Directive({
  selector: '[appFeatherIcon]'
})
export class FeatherIconDirective implements AfterViewInit {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  ngAfterViewInit(): void {
    // feather icon
    feather.replace();
  }
}
