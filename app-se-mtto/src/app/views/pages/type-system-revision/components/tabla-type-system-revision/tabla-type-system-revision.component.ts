import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';

import Swal from 'sweetalert2/src/sweetalert2'

@Component({
  selector: 'app-tabla-type-system-revision',
  templateUrl: './tabla-type-system-revision.component.html',
  styleUrls: ['./tabla-type-system-revision.component.scss']
})

export class TablaTypeSystemRevisionComponent implements OnInit {

  @Input() data;
  @Output() salida = new EventEmitter<any>();
  @Output() refresh = new EventEmitter<any>();
  @Output() updateData = new EventEmitter<any>();
  @ViewChild('TABLE', { static: true }) table: ElementRef;
  original: any;
  datos = [];
  page = 1
  pageSize = 16
  
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

  showData(data) {
    
  }

  setUpdateData(id, status) {
    if (status != 'completed') this.updateData.emit(id)
    else Swal.fire({text: 'No se puede actualizar esta revisión ya que esta completa.'})
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
