import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { TypeSystemService } from '../../../../../core/services/type-system.service'

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
  pageSize = 12

  responseTypeQuestion:any = []
  
  constructor(
    private router: Router,
    private typeSystemService: TypeSystemService,
  ) { }

  ngOnInit(): void {
    this.getTypeQuestionName()
  }
  
  ngOnChanges() {
    this.original = this.data;
    this.datos = this.data
    console.log(this.data)
    this.senData();
  }

  getTypeQuestionName() {
    this.typeSystemService
      .getTypeQuestionName()
      .subscribe((res:any) => {
        this.responseTypeQuestion = res.data;
      });
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
