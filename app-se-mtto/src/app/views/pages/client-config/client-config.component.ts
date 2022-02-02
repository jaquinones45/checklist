import { Component, OnInit } from '@angular/core';

import * as XLSX from 'xlsx';

import { ClientService } from 'src/app/core/services/client.service'

@Component({
  selector: 'app-client-config',
  templateUrl: './client-config.component.html',
  styleUrls: ['./client-config.component.scss']
})
export class ClientConfigComponent implements OnInit {

  dataClient:any = []
  tablaClient:any

  loaded : boolean = false

  constructor(
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
    this.getClient()
  }

  getClient() {
    this.clientService.getClient()
      .toPromise()
      .then((response:any) => {
        this.dataClient = response.data
        this.loaded = true
      });
  }

  setClient($event){
    this.tablaClient = $event
  }

  exportAsExcel() {
    const wsme: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.tablaClient);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, wsme, 'Clientes');

    let now = new Date()
    let xlsx = 'Clientes-' + now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + '-' + now.getTime() +'.xlsx'
    XLSX.writeFile(wb, xlsx);
  }

  setRefresh($event) {
    if ($event) this.getClient()
  }
}