import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as XLSX from 'xlsx';

import { TypeSystemService } from 'src/app/core/services/type-system.service'
import { FormService } from 'src/app/core/services/form.service'

import Swal from 'sweetalert2/src/sweetalert2'

@Component({
  selector: 'app-type-system-revision-preview',
  templateUrl: './type-system-revision-preview.component.html',
  styleUrls: ['./type-system-revision-preview.component.scss']
})
export class TypeSystemRevisionPreviewComponent implements OnInit {

  dataTypeSystemRevision:any = []
  tablaTypeSystemRevision:any

  loaded : boolean = false
  loadFormName : boolean = true

  newQuestion: boolean = false

  responseTypeSystemRevision: any = [];
  responseRevisionForm: any = [];
  responseTypeComponent: any = [];
  responseForm: any = [];
  responseTypeQuestion: any = [];

  form = {id: null, responsable: '', date: '', hours: 0, status: 'draft', components: [], system_id: this.route.snapshot.paramMap.get('type_system_id'), form_id: null, update: false}
  
  components:any = []

  constructor(
    private route: ActivatedRoute, 
    private typeSystemService: TypeSystemService,
    private formService: FormService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getFormName()
    this.getTypeQuestionName()
  }

  getFormName() {
    this.loadFormName = false
    this.typeSystemService
      .getFormName({client_id: localStorage.getItem('client_id')})
      .subscribe((res:any) => {
        this.responseForm = res.data;
        if (this.route.snapshot.paramMap.get('revision_id')) this.getOneFormRevision()
        this.loadFormName = true
      });
  }

  getTypeQuestionName() {
    this.typeSystemService
      .getTypeQuestionName()
      .subscribe((res:any) => {
        this.responseTypeQuestion = res.data;
      });
  }

  getOneFormRevision() {
    this.formService
      .getOneForm(this.route.snapshot.paramMap.get('revision_id'))
      .subscribe((res:any) => {
        this.form = res.data;
        this.form.update = true
        this.setSelectForm(res.data.form_id)
      });
  }


  getComponentName() {
    const params = {
      client_id: localStorage.getItem('client_id')
    }
    this.typeSystemService
      .getComponentName(params)
      .subscribe((res:any) => {
          this.responseTypeComponent = res.data;
      });
  }

  setData($event) {
    this.responseRevisionForm = $event
  }

  setUpdateData($event) {
    this.typeSystemService
      .getOneTypeSystemRevision($event)
      .subscribe((res:any) => {
        if (res.data.status != 'completed') {
          this.form = res.data
          this.form.update = true
        } else {
          Swal.fire({text: 'No se puede actualizar esta revisión ya que esta completa.'})
        }
      });
  }

  onChangeDateTime($event) {
    this.form.date = $event.value
  }

  setTypeSystemRevision($event){
    this.tablaTypeSystemRevision = $event
  }

  goBack() {
    this.redirectTo(`type-system/${this.route.snapshot.paramMap.get('type_system_id')}/revision`)
  }

  newRevision() {
    this.form = {id: null, responsable: '', date: '', hours: 0, status: 'draft', components: [], system_id: this.route.snapshot.paramMap.get('type_system_id'), form_id: null, update: false}
  }

  saveOrUpdateRevision(status) {
    if (this.form.components.length == 0) return Swal.fire({text: 'Al menos se debe crear una pregunta para la lista de revisión'})

    if (this.form.responsable && this.form.date && this.form.hours >= 0) {
      this.form.status = status

      if (!this.form.update) {
        this.typeSystemService
          .saveTypeSystemRevision(this.form)
          .subscribe((res:any) => {
            if (res.success) {
              Swal.fire({html: res.message})
              this.newRevision()
              this.goBack()
            } else {
              Swal.fire({text: res.error})
            }
          })
      } else {
        this.typeSystemService
          .updateTypeSystemRevision(this.form)
          .subscribe((res:any) => {
            if (res.success) {
              Swal.fire({html: res.message})
              this.newRevision()
              this.goBack()
            } else {
              Swal.fire({text: res.error})
            }
          });
      }
    } else {
      Swal.fire({text: 'Se debe llenar todos los campos obligatorios.'})
    }
  }

  selectForm($event): void {
    this.form.components = []
    this.newQuestion = false
    if ($event.itemData) {
      
      this.form.form_id = $event.itemData.id
      const index = this.responseForm.findIndex((item:any) => item.id === $event.itemData.id)

      if (index != -1) {
        this.form.components = this.responseForm[index].components
        setTimeout( () => this.newQuestion = true, 1000)
      }
    }
  }

  setSelectForm(form_id) {
    this.form.components = []
    this.newQuestion = false
    const index = this.responseForm.findIndex((item:any) => item.id === form_id)

    if (index != -1) {
      this.form.components = this.responseForm[index].components

      setTimeout( () => this.newQuestion = true, 1000)
    }
  }

  exportAsExcel() {
    const wsme: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.tablaTypeSystemRevision);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, wsme, 'Revisiones-' + this.route.snapshot.paramMap.get('type_system_id'));

    let now = new Date()
    let xlsx = 'Revisiones-' + this.route.snapshot.paramMap.get('type_system_id') + '-' + now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + '-' + now.getTime() +'.xlsx'
    XLSX.writeFile(wb, xlsx);
  }

  redirectPreview() {
    this.redirectTo(`type-system/${this.route.snapshot.paramMap.get('type_system_id')}/revision`)
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(
      () => this.router.navigate([uri])
    );
  }
}