import { Component, OnInit } from '@angular/core';

import * as XLSX from 'xlsx';

import { FormService } from 'src/app/core/services/form.service'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  dataForm:any = []
  dataOneForm:any = []
  tablaForm:any

  loaded : boolean = false
  loadOneForm : boolean = false

  constructor(
    private formService: FormService
  ) { }

  ngOnInit(): void {
    this.getForm()
  }

  getForm() {
    this.formService.getForm()
      .toPromise()
      .then((response:any) => {
        this.dataForm = response.data
        if (response.data.length > 0) this.getOneForm(response.data[0].id)
        this.loaded = true
      });
  }

  getOneForm(id) {
    this.formService.getOneForm(id)
      .toPromise()
      .then((response:any) => {
        this.dataOneForm = response.data
        this.loadOneForm = true
      });
  }

  setForm($event){
    this.tablaForm = $event
  }

  exportAsExcel() {
    const wsme: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.tablaForm);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, wsme, 'Formes');

    let now = new Date()
    let xlsx = 'Formes-' + now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + '-' + now.getTime() +'.xlsx'
    XLSX.writeFile(wb, xlsx);
  }

  setRefresh($event) {
    if ($event) this.getForm()
  }

  setSalidaData($event) {
    this.getOneForm($event)
  }
}