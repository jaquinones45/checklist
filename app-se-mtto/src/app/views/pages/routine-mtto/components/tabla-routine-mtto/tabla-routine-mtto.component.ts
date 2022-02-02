import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'app-tabla-routine-mtto',
  templateUrl: './tabla-routine-mtto.component.html',
  styleUrls: ['./tabla-routine-mtto.component.scss']
})
export class TablaRoutineMttoComponent implements OnInit {

  @Input() data;
  @Output() salida = new EventEmitter<any>();
  @Output() refresh = new EventEmitter<any>();
  @ViewChild('TABLE', { static: true }) table: ElementRef;
  original: any;
  datos = [];
  page = 1
  pageSize = 22
  
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

  getStatusFill(status) {
    switch (status) {
      case 'draft': 
        return '#b7b8b9';
      case 'previous': 
        return '#b7b8b9';
      case 'completed': 
        return '#28a745';
    }
  }

  getStatusName(status) {
    switch (status) {
      case 'draft': 
        return 'Preliminar';
      case 'previous': 
        return 'Preliminar';
      case 'completed': 
        return 'Compleatado';
    }
  }
}
