import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as XLSX from 'xlsx';

import { TypeSystemService } from 'src/app/core/services/type-system.service'
import { FormService } from 'src/app/core/services/form.service'

import Swal from 'sweetalert2/src/sweetalert2'

@Component({
  selector: 'app-type-system-revision',
  templateUrl: './type-system-revision.component.html',
  styleUrls: ['./type-system-revision.component.scss']
})
export class TypeSystemComponent implements OnInit {

  dataTypeSystemRevision:any = []
  tablaTypeSystemRevision:any

  loaded : boolean = false
  loadFormName : boolean = true

  responseTypeSystemRevision: any = [];
  responseRevisionForm: any = [];
  responseComponent: any = [];
  responseForm: any = [];
  responseTypeQuestion: any = [];

  form = {id: null, responsable: '', date: '', hours: 0, status: 'draft', questions: [], type_system_id:  this.route.snapshot.paramMap.get('id'), component_id: null, form_id: null, update: false}
  
  constructor(
    private route: ActivatedRoute, 
    private routineMttoService: TypeSystemService,
    private formService: FormService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getTypeSystemRevision()
    this.getComponentName()
    this.getTypeQuestionName()
  }

  getTypeSystemRevision() {
    const params = {
      type_system_id: this.route.snapshot.paramMap.get('id')
    }

    this.routineMttoService
      .getTypeSystemRevision(params)
      .subscribe((res:any) => {
        this.responseTypeSystemRevision = res.data;
        this.loaded = true
      });
  }

  getComponentName() {
    const params = {
      client_id: localStorage.getItem('client_id')
    }
    this.formService
      .getComponentName(params)
      .subscribe((res:any) => {
          this.responseComponent = res.data;
      });
  }

  getTypeQuestionName() {
    this.formService
      .getTypeQuestionName()
      .subscribe((res:any) => {
        this.responseTypeQuestion = res.data;
      });
  }

  setData($event) {
    console.log($event)
    this.responseRevisionForm = $event
  }

  setUpdateData($event) {
    this.routineMttoService
      .getOneTypeSystemRevision($event)
      .subscribe((res:any) => {
        if (res.data.status != 'completed') {
          this.form = res.data
          this.form.update = true

          this.getFormName(res.data.country)
        } else {
          Swal.fire({text: 'No se puede actualizar esta revisión ya que esta completa.'})
        }
      });
  }

  onChangeDate($event) {
    console.log($event)
    this.form.date = $event.value
  }

  setTypeSystemRevision($event){
    this.tablaTypeSystemRevision = $event
  }

  goBack() {
    this.redirectTo(`type-system`)
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(
      () => this.router.navigate([uri])
    );
  }

  newRevision() {
    this.form = {id: null, responsable: '', date: '', hours: 0, status: 'draft', questions: [], type_system_id:  this.route.snapshot.paramMap.get('id'), component_id: null, form_id: null, update: false}
  }

  saveOrUpdateRevision(status) {
    if (this.form.questions.length == 0) Swal.fire({text: 'Al menos debe de haber una pregunta a la revisión'})

    if (this.form.responsable && this.form.date && this.form.hours >= 0) {
      this.form.status = status

      if (!this.form.update) {
        this.routineMttoService
          .saveTypeSystemRevision(this.form)
          .subscribe((res:any) => {
            if (res.success) {
              Swal.fire({html: res.message})
              this.getTypeSystemRevision()
              this.newRevision()
            } else {
              Swal.fire({text: res.error})
            }
          })
      } else {
        this.routineMttoService
          .updateTypeSystemRevision(this.form)
          .subscribe((res:any) => {
            if (res.success) {
              Swal.fire({html: res.message})
              this.getTypeSystemRevision()
              this.newRevision()
            } else {
              Swal.fire({text: res.error})
            }
          });
      }
    } else {
      Swal.fire({text: 'Se debe llenar todos los campos obligatorios.'})
    }
  }

  getFormName(country) {
    this.loadFormName = false
    this.formService
      .getFormName({country})
      .subscribe((res:any) => {
        this.responseForm = res.data;
        this.loadFormName = true
      });
  }
  
  selectComponent($event): void {
    if ($event.itemData) {
      console.log($event.itemData)
      this.form.component_id = $event.itemData.id
      this.form.form_id = null
      this.form.questions = []
      const index = this.responseComponent.findIndex((item:any) => item.id === $event.itemData.id)
      if (index != -1) {
        this.getFormName(this.responseComponent[index].country)
      }
    }
  }

  selectForm($event): void {
    if ($event.itemData) {
      this.form.form_id = $event.itemData.id
      const index = this.responseForm.findIndex((item:any) => item.id === $event.itemData.id)
      if (index != -1) this.form.questions = this.responseForm[index].questions.map((item:any) => {
        const index = this.responseTypeQuestion.findIndex((item:any) => item.default_value === 1)
        if (index != -1) item.type_question_id = this.responseTypeQuestion[index].id
        else item.type_question_id = 1
        item.notes = ''
        return item
      })
    }
  }

  exportAsExcel() {
    const wsme: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.tablaTypeSystemRevision);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, wsme, 'Revisiones-' + this.route.snapshot.paramMap.get('id'));

    let now = new Date()
    let xlsx = 'Revisiones-' + this.route.snapshot.paramMap.get('id') + '-' + now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + '-' + now.getTime() +'.xlsx'
    XLSX.writeFile(wb, xlsx);
  }

  setRefresh($event) {
    if ($event) this.getTypeSystemRevision()
  }

  setSaveData($event) {
    console.log($event)
  }
}