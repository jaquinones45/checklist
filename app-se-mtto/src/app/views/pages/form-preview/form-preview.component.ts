import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FormService } from 'src/app/core/services/form.service'

import Swal from 'sweetalert2/src/sweetalert2'

@Component({
  selector: 'app-form-preview',
  templateUrl: './form-preview.component.html',
  styleUrls: ['./form-preview.component.scss']
})
export class FormPreviewComponent implements OnInit {

  dataForm:any = []
  dataOneForm:any = []
  tablaForm:any

  loaded : boolean = false
  loadOneForm : boolean = false

  showQuestion: boolean = false

  question: any = {}

  loadRefreshPage = false

  data = {id: null, name: '', type_component_id: null, country_id: null, questions: [], load: false}

  public localFields: Object = { text: 'name' }
  loadTypeComponent: boolean = false;
  loadCountry: boolean = false;

  responseTypeComponent: any;
  responseCountry: any;
  message: string = '';
  error: string = '';

  form_id = this.route.snapshot.paramMap.get('id')

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: FormService,
  ) { }

  ngOnInit(): void {
    if (this.form_id) this.getOneForm()
    this.getTypeComponentName()
    this.getCountryName()
  }

  getOneForm() {
    this.formService.getOneForm(this.form_id)
      .toPromise()
      .then((response:any) => {
        this.dataOneForm = response.data
        this.showQuestion = true
      });
  }

  getTypeComponentName() {
    this.loadTypeComponent = false
    this.formService
      .getTypeComponentName()
      .subscribe((res:any) => {
        this.responseTypeComponent = res.data;
        this.loadTypeComponent = true
      });
  }

  getCountryName() {
    this.loadCountry = false
    this.formService
      .getCountryName()
      .subscribe((res:any) => {
        this.responseCountry = res.data;
        this.loadCountry = true
      });
  }

  clickSaveOrUpdate() {
    if (this.data.questions.length == 0) return Swal.fire({text: 'Al menos se debe crear una pregunta para la lista de revisión'})

    if (this.data.type_component_id && this.data.country_id) {
      if (!this.form_id) {
        this.formService
          .saveForm(this.data)
          .subscribe((response:any) => {
            this.loadRefreshPage = true;
            if (response.success) {
              this.message = response.message
              this.error = ''
              setTimeout( () => {
                this.data = {id: null, name: '', type_component_id: null, country_id: null, questions: [], load: false}
                this.redirectForm()
              }, 2000 )
            } else {
              this.data.load = false
              this.message = ''
              this.error = response.error
            }
          },
          error => {
            console.log(error);
          })
      } else {
        this.formService
          .updateForm(this.data)
          .subscribe((response:any) => {
            this.loadRefreshPage = true;
            if (response.success) {
              this.message = response.message
              this.error = ''
              setTimeout( () => {
                this.data = {id: null, name: '', type_component_id: null, country_id: null, questions: [], load: false}
                this.redirectForm()
              }, 2000 )
            } else {
              this.data.load = false
              this.message = ''
              this.error = response.error
            }
          },
          error => {
            console.log(error);
          })
      }
    } else {
      Swal.fire({text: 'Se debe llenar todos los campos obligatorios.'})
    }
  }

  setRefresh($event) {
    console.log($event)
  }

  setSalidaData($event) {
    this.data.questions.push($event);
    console.log($event)
  }

  redirectForm() {
    this.redirectTo(`form`)
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(
      () => this.router.navigate([uri])
    );
  }
}