import { Component, OnInit } from '@angular/core';

import * as XLSX from 'xlsx';

import { MttoCorrectiveService } from 'src/app/core/services/mtto-corrective.service'

@Component({
  selector: 'app-mtto-corrective',
  templateUrl: './mtto-corrective.component.html',
  styleUrls: ['./mtto-corrective.component.scss']
})
export class MttoCorrectiveComponent implements OnInit {

  dataMttoCorrective:any = []
  tablaMttoCorrective:any

  loaded : boolean = false

  constructor(
    private mttoCorrectiveService: MttoCorrectiveService
  ) { }

  ngOnInit(): void {
    this.getMttoCorrective()
  }

  getMttoCorrective() {
    const params = {
      client_id: localStorage.getItem('client_id'),
    }
    this.mttoCorrectiveService.getMttoCorrective(params)
      .toPromise()
      .then((response:any) => {
        this.dataMttoCorrective = response.data
        this.loaded = true
      });
  }

  setMttoCorrective($event){
    this.tablaMttoCorrective = $event
  }

  exportAsExcel() {
    const wsme: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.tablaMttoCorrective);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, wsme, 'Mantenimientos Correctivos');

    let now = new Date()
    let xlsx = 'Mantenimientos-Correctivos-' + now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + '-' + now.getTime() +'.xlsx'
    XLSX.writeFile(wb, xlsx);
  }

  setRefresh($event) {
    if ($event) this.getMttoCorrective()
  }
}