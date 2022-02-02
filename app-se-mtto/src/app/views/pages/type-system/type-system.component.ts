import { Component, OnInit } from '@angular/core';

import * as XLSX from 'xlsx';

import { TypeSystemService } from 'src/app/core/services/type-system.service'

@Component({
  selector: 'app-type-system',
  templateUrl: './type-system.component.html',
  styleUrls: ['./type-system.component.scss']
})
export class TypeSystemComponent implements OnInit {

  dataTypeSystem:any = []
  tablaTypeSystem:any

  loaded : boolean = false

  constructor(
    private typeSystemService: TypeSystemService
  ) { }

  ngOnInit(): void {
    this.getTypeSystem()
  }

  getTypeSystem() {
    const params = {
      client_id: localStorage.getItem('client_id'),
    }
    this.typeSystemService.getTypeSystem(params)
      .toPromise()
      .then((response:any) => {
        this.dataTypeSystem = response.data
        this.loaded = true
      });
  }

  setTypeSystem($event){
    this.tablaTypeSystem = $event
  }

  exportAsExcel() {
    const wsme: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.tablaTypeSystem);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, wsme, 'Tipo Sistema');

    let now = new Date()
    let xlsx = 'Tipo-Sistema-' + now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + '-' + now.getTime() +'.xlsx'
    XLSX.writeFile(wb, xlsx);
  }

  setRefresh($event) {
    if ($event) this.getTypeSystem()
  }
}