import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabla-revision-form',
  templateUrl: './tabla-revision-form.component.html',
  styleUrls: ['./tabla-revision-form.component.scss']
})
export class TablaRevisionFormComponent implements OnInit {

  @Input() data;
  @Output() salida = new EventEmitter<any>();
  @Output() refresh = new EventEmitter<any>();
  @ViewChild('TABLE', { static: true }) table: ElementRef;
  original: any;
  datos = [];
  page = 1
  pageSize = 16
  
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {}
  
  ngOnChanges() {
    this.original = this.data;
    this.datos = this.data;
    console.log(this.data)
    this.senData();
  }

  senData() {
    this.salida.emit(this.table.nativeElement)
  }

  setRefresh($event) {
    this.refresh.emit($event)
  }

  setUpdateData($event) {

  }

  getStatusFill(status) {
    switch (status) {
      case 'pending': 
        return '#b7b8b9';
      case 'previous': 
        return '#b7b8b9';
      case 'completed': 
        return '#28a745';
    }
  }

  getStatusName(status) {
    switch (status) {
      case 'pending': 
        return 'Preliminar';
      case 'previous': 
        return 'Preliminar';
      case 'completed': 
        return 'Compleatado';
    }
  }
}
