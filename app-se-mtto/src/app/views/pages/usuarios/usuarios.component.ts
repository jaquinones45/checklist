import { Component, OnInit } from '@angular/core';

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  dataUsuarios:any = []
  tablaUsuarios:any

  loaded : boolean = false

  constructor() { }

  ngOnInit(): void {
    //this.getUsuarios()
  }

  /*getUsuarios() {
    this.service.getUsuarios().toPromise().then((response:any) => {
      this.dataUsuarios = response.data.map(el => {
        el.phone = el.phone.toString()
        return el
      })
      this.loaded = true
    });
  }*/

  setUsuarios($event){
    this.tablaUsuarios = $event
  }

  exportUsuariosExcel() {
    const wsme: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.tablaUsuarios);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, wsme, 'Usuarios');

    let now = new Date()
    let xlsx = 'Usuarios-' + now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + '-' + now.getTime() +'.xlsx'
    XLSX.writeFile(wb, xlsx);
  }

  setRefresh($event) {
  }
}