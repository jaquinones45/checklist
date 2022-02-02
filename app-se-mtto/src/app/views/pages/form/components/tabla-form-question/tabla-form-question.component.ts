import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'app-tabla-form-question',
  templateUrl: './tabla-form-question.component.html',
  styleUrls: ['./tabla-form-question.component.scss']
})
export class TablaFormQuestionComponent implements OnInit {

  @Input() data;
  @Output() salida = new EventEmitter<any>();
  @Output() refresh = new EventEmitter<any>();
  @ViewChild('TABLE', { static: true }) table: ElementRef;
  original: any;
  datos = [];
  page = 1
  pageSize = 18
  
  constructor() { }

  ngOnInit(): void {}
  
  ngOnChanges() {
    this.original = this.data;
    this.datos = this.data;
    this.senData();
  }

  senData() {
    this.salida.emit(this.table.nativeElement)
  }

  setRefresh($event) {
    this.refresh.emit($event)
  }

}
