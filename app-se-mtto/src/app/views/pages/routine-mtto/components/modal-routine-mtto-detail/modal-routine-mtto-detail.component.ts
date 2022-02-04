import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as XLSX from 'xlsx';

import { NgbModalConfig, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { RoutineMttoService } from 'src/app/core/services/routine-mtto.service';

@Component({
  selector: 'app-modal-routine-mtto-detail',
  templateUrl: './modal-routine-mtto-detail.component.html',
  styleUrls: [ './modal-routine-mtto-detail.component.scss']
})
export class ModalRoutineMttoDetailComponent {
  closeResult = ''
  load: boolean = false
  modal: boolean = false
  annotations: any = []
  loadFields: boolean = false
  reader: FileReader
  update = false
  comment = ''
  datos = {}
  params = {
    users_id: localStorage.getItem('users_id')
  }
  terms_and_conditions: boolean = false

  dataDailyShiftSplice : any = {}
  dataDailyShiftSpliceEvent : any = []

  loadDailyShiftSplice : boolean = false
  loadDailyShiftSpliceEvent : boolean = false

  tablaDailyShiftSpliceEvent:any

  @Input() revision_id
  @Output() refresh = new EventEmitter<any>();

  data:any = {
    questions: []
  }
  
  datosjson: any;
  public localFields: Object = { text: 'name', value: 'id' }

  constructor(
    private modalService: NgbModal,
    private config: NgbModalConfig,
    private routineMttoService: RoutineMttoService,
  ) {
    this.config.backdrop = 'static';
    this.config.keyboard = false;
  }

  ngOnInit(): void { }

  submitForm(form: NgForm) {
    if(!form.valid) {
      return false;
    } else {
      alert(JSON.stringify(form.value))
    }
  }

  open(content) {
    this.getOneTypeSystemRevision()

    this.modalService.open(content,
      {  size: 'lg', centered: true, ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult =
          `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getOneTypeSystemRevision() {
    this.routineMttoService
      .getOneRoutineMttoRevision(this.revision_id)
      .subscribe((res:any) => {
        this.data = res.data
        this.modal = true
      });
  }

  getStatusFill(status) {
    switch (status) {
      case 'draft': 
        return '#b7b8b9';
      case 'previous': 
        return '#b7b8b9';
      case 'completed': 
        return '#28a745';
    }
  }

  setDailyShiftSplice($event){
    this.tablaDailyShiftSpliceEvent = $event
  }

  exportEventLogAsExcel() {
    const wsme: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.tablaDailyShiftSpliceEvent);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // No puede tener mas de 30 caracteres
    XLSX.utils.book_append_sheet(wb, wsme, 'Reporte-Empalme-Turno-Diario');

    let now = new Date()
    let xlsx = 'Reporte-Empalme-Turno-Diario-' + now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + '-' + now.getTime() +'.xlsx'
    XLSX.writeFile(wb, xlsx);
  }
}
