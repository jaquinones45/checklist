import { Component, OnInit } from '@angular/core';

import * as XLSX from 'xlsx';

import { PlantService } from 'src/app/core/services/plant.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-module-plant',
  templateUrl: './module-plant.component.html',
  styleUrls: ['./module-plant.component.scss']
})
export class ModulePlantComponent implements OnInit {

  dataPlant:any = []
  tablaPlant:any

  loaded : boolean = false

  params = {
    search: '',
    client_id: localStorage.getItem('client_id') > '0' ? localStorage.getItem('client_id') : this.route.snapshot.paramMap.get('id'),
  }

  constructor(
    private plantService: PlantService,
    private route: ActivatedRoute, 
  ) { }

  ngOnInit(): void {
    this.getPlant()
  }

  getPlant() {
    this.plantService.getPlant(this.params)
      .toPromise()
      .then((response:any) => {
        this.dataPlant = response.data
        this.loaded = true
      });
  }

  setPlant($event){
    this.tablaPlant = $event
  }

  exportAsExcel() {
    const wsme: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.tablaPlant);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, wsme, 'Plantas');

    let now = new Date()
    let xlsx = 'Plantas-' + now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + '-' + now.getTime() +'.xlsx'
    XLSX.writeFile(wb, xlsx);
  }

  setRefresh($event) {
    if ($event) this.getPlant()
  }
}