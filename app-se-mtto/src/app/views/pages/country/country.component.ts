import { Component, OnInit } from '@angular/core';

import * as XLSX from 'xlsx';

import { CountryService } from 'src/app/core/services/country.service'

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {

  dataCountry:any = []
  tablaCountry:any

  loaded : boolean = false

  constructor(
    private countryService: CountryService
  ) { }

  ngOnInit(): void {
    this.getCountry()
  }

  getCountry() {
    this.countryService.getCountry()
      .toPromise()
      .then((response:any) => {
        this.dataCountry = response.data
        this.loaded = true
      });
  }

  setCountry($event){
    this.tablaCountry = $event
  }

  exportAsExcel() {
    const wsme: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.tablaCountry);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, wsme, 'Countryes');

    let now = new Date()
    let xlsx = 'Countryes-' + now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + '-' + now.getTime() +'.xlsx'
    XLSX.writeFile(wb, xlsx);
  }

  setRefresh($event) {
    if ($event) this.getCountry()
  }
}