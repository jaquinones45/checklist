import { Component, OnInit } from '@angular/core';

import * as XLSX from 'xlsx';

import { TypeComponentService } from 'src/app/core/services/type-component.service'

@Component({
  selector: 'app-type-component',
  templateUrl: './type-component.component.html',
  styleUrls: ['./type-component.component.scss']
})
export class TypeComponentComponent implements OnInit {

  dataTypeComponent:any = []
  tablaTypeComponent:any

  loaded : boolean = false

  constructor(
    private typeComponentService: TypeComponentService
  ) { }

  ngOnInit(): void {
    this.getTypeComponent()
  }

  getTypeComponent() {
    this.typeComponentService.getTypeComponent()
      .toPromise()
      .then((response:any) => {
        this.dataTypeComponent = response.data
        this.loaded = true
      });
  }

  setTypeComponent($event){
    this.tablaTypeComponent = $event
  }

  exportAsExcel() {
    const wsme: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.tablaTypeComponent);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, wsme, 'Componentes');

    let now = new Date()
    let xlsx = 'Componentes-' + now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + '-' + now.getTime() +'.xlsx'
    XLSX.writeFile(wb, xlsx);
  }

  setRefresh($event) {
    if ($event) this.getTypeComponent()
  }
}