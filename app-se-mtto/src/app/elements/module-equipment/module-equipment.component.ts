import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as XLSX from 'xlsx';

import { EquipmentService } from 'src/app/core/services/equipment.service'

@Component({
  selector: 'app-module-equipment',
  templateUrl: './module-equipment.component.html',
  styleUrls: ['./module-equipment.component.scss']
})
export class ModuleEquipmentComponent implements OnInit {

  dataEquipment:any = []
  tablaEquipment:any

  loaded : boolean = false

  params = {
    search: '',
    client_id: localStorage.getItem('client_id') > '0' ? localStorage.getItem('client_id') : this.route.snapshot.paramMap.get('id'),
  }

  constructor(
    private equipmentService: EquipmentService,
    private route: ActivatedRoute, 
  ) { }

  ngOnInit(): void {
    this.getEquipment()
  }

  getEquipment() {
    this.equipmentService.getEquipment(this.params)
      .toPromise()
      .then((response:any) => {
        this.dataEquipment = response.data
        this.loaded = true
      });
  }

  setEquipment($event){
    this.tablaEquipment = $event
  }

  exportAsExcel() {
    const wsme: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.tablaEquipment);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, wsme, 'Equipos');

    let now = new Date()
    let xlsx = 'Equipos-' + now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + '-' + now.getTime() +'.xlsx'
    XLSX.writeFile(wb, xlsx);
  }

  setRefresh($event) {
    if ($event) this.getEquipment()
  }
}