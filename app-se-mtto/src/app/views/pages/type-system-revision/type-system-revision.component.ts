import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as XLSX from 'xlsx';

import { TypeSystemService } from 'src/app/core/services/type-system.service'

import Swal from 'sweetalert2/src/sweetalert2'

@Component({
  selector: 'app-type-system-revision',
  templateUrl: './type-system-revision.component.html',
  styleUrls: ['./type-system-revision.component.scss']
})
export class TypeSystemRevisionComponent implements OnInit {

  tablaTypeSystemRevision:any

  loaded : boolean = false

  responseTypeSystemRevision: any = [];

  type_system_id = this.route.snapshot.paramMap.get('type_system_id')
  
  constructor(
    private route: ActivatedRoute, 
    private typeSystemService: TypeSystemService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getTypeSystemRevision()
  }

  getTypeSystemRevision() {
    const params = {
      type_system_id: this.type_system_id
    }
    console.log(params)
    this.typeSystemService
      .getTypeSystemRevision(params)
      .subscribe((res:any) => {
        this.responseTypeSystemRevision = res.data;
        this.loaded = true
      });
  }

  setTypeSystemRevision($event){
    this.tablaTypeSystemRevision = $event
  }

  goBack() {
    this.redirectTo(`type-system`)
  }

  redirectPreview() {
    this.redirectTo(`type-system/${this.route.snapshot.paramMap.get('type_system_id')}/revision/preview`)
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(
      () => this.router.navigate([uri])
    );
  }

  exportAsExcel() {
    const wsme: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.tablaTypeSystemRevision);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, wsme, 'Revisiones-' + this.route.snapshot.paramMap.get('type_system_id'));

    let now = new Date()
    let xlsx = 'Revisiones-' + this.route.snapshot.paramMap.get('type_system_id') + '-' + now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + '-' + now.getTime() +'.xlsx'
    XLSX.writeFile(wb, xlsx);
  }
}