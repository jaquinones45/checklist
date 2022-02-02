import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as XLSX from 'xlsx';

import { ComponentService } from 'src/app/core/services/component.service'

@Component({
  selector: 'app-module-component',
  templateUrl: './module-component.component.html',
  styleUrls: ['./module-component.component.scss']
})
export class ModuleComponentComponent implements OnInit {

  dataComponent:any = []
  tablaComponent:any

  loaded : boolean = false

  params = {
    search: '',
    client_id: localStorage.getItem('client_id') > '0' ? localStorage.getItem('client_id') : this.route.snapshot.paramMap.get('id'),
  }

  constructor(
    private componentService: ComponentService,
    private route: ActivatedRoute, 
  ) { }

  ngOnInit(): void {
    this.getComponent()
  }

  getComponent() {
    this.componentService.getComponent(this.params)
      .toPromise()
      .then((response:any) => {
        this.dataComponent = response.data
        this.loaded = true
      });
  }

  setComponent($event){
    this.tablaComponent = $event
  }

  exportAsExcel() {
    const wsme: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.tablaComponent);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, wsme, 'Componentes');

    let now = new Date()
    let xlsx = 'Componentes-' + now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + '-' + now.getTime() +'.xlsx'
    XLSX.writeFile(wb, xlsx);
  }

  setRefresh($event) {
    if ($event) this.getComponent()
  }
}