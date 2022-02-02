import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-slider-round-checked',
  templateUrl: './slider-round-checked.component.html',
  styleUrls: ['./slider-round-checked.component.scss']
})
export class SliderRoundCheckedComponent implements OnInit {

  @Input() data;

  constructor() { }

  ngOnInit(): void { }

}
