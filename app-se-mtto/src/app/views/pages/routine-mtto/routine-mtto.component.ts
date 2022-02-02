import { Component, OnInit } from '@angular/core';

import * as XLSX from 'xlsx';

import { RoutineMttoService } from 'src/app/core/services/routine-mtto.service'

@Component({
  selector: 'app-routine-mtto',
  templateUrl: './routine-mtto.component.html',
  styleUrls: ['./routine-mtto.component.scss']
})
export class RoutineMttoComponent implements OnInit {

  dataRoutineMtto:any = []
  tablaRoutineMtto:any

  loaded : boolean = false

  constructor(
    private routineMttoService: RoutineMttoService
  ) { }

  ngOnInit(): void {
    this.getRoutineMtto()
  }

  getRoutineMtto() {
    const params = {
      client_id: localStorage.getItem('client_id'),
    }
    this.routineMttoService.getRoutineMtto(params)
      .toPromise()
      .then((response:any) => {
        this.dataRoutineMtto = response.data
        this.loaded = true
      });
  }

  setRoutineMtto($event){
    this.tablaRoutineMtto = $event
  }

  exportAsExcel() {
    const wsme: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.tablaRoutineMtto);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, wsme, 'Rutina Mantenimiento');

    let now = new Date()
    let xlsx = 'Rutina Mantenimiento-' + now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + '-' + now.getTime() +'.xlsx'
    XLSX.writeFile(wb, xlsx);
  }

  setRefresh($event) {
    if ($event) this.getRoutineMtto()
  }
}