import { Component, EventEmitter, Input, Output} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { NgbModalConfig, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { FormService } from 'src/app/core/services/form.service'

@Component({
  selector: 'app-form-revision-form',
  templateUrl: './form-revision-form.component.html',
  styleUrls: ['./form-revision-form.component.scss']
})
export class FormRevisionFormComponent {
  closeResult = ''
  load: boolean = false
  modal: boolean = false
  plants: any = []
  @Input() id
  @Input() nombre
  @Input() revision_id = null
  @Input() data = {id: null, component_id: null, form_id: null, questions: [], client_id: localStorage.getItem('client_id'), type_system_id: this.route.snapshot.paramMap.get('id'), load: false}
  @Input() update: boolean = false
  @Output() refresh = new EventEmitter<any>();
  @Output() updateData = new EventEmitter<any>();
  
  loadRefreshPage = false

  public localFields: Object = { text: 'name' }

  responseComponent: any = [];
  responseForm: any = [];
  responseTypeQuestion: any = [];

  message: string = '';
  error: string = '';

  constructor(
    private modalService: NgbModal, 
    private formService: FormService,
    private config: NgbModalConfig,
    private route: ActivatedRoute, 
    ) {
      this.config.backdrop = 'static';
      this.config.keyboard = false;
    }

  ngOnInit(): void {}

  ngDoCheck() {
    this.sendRefresh();
  }

  submitForm(form: NgForm) {
    if(!form.valid) {
      return false;
    } else {
      alert(JSON.stringify(form.value))
    }
  }

  open(content) {
    this.modal = true

    this.message = ''
    this.error = ''

    this.getComponentName()
    this.getTypeQuestionName()

    if (!this.update) this.data = {id: null, component_id: null, form_id: null, questions: [], client_id: localStorage.getItem('client_id'), type_system_id: this.route.snapshot.paramMap.get('id'), load: false}

    this.modalService.open(content,
      { size: 'lg', centered: true, ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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

  getFormName(country) {
    this.formService
      .getFormName({country})
      .subscribe((res:any) => {
          this.responseForm = res.data;
      });
  }

  selectComponent($event): void {
    if ($event.itemData) {
      const index = this.responseComponent.findIndex((item:any) => item.id === $event.itemData.id)
      if (index != -1) {
        this.getFormName(this.responseComponent[index].country)
      }
    }
  }

  selectForm($event): void {
    if ($event.itemData) {
      const index = this.responseForm.findIndex((item:any) => item.id === $event.itemData.id)
      if (index != -1) this.data.questions = this.responseForm[index].questions.map((item:any) => {
        const index = this.responseTypeQuestion.findIndex((item:any) => item.default_value === 1)
        if (index != -1) item.type_question_id = this.responseTypeQuestion[index].id
        else item.type_question_id = 1
        item.notes = ''
        return item
      })
    }
  }

  clickSaveOrUpdate(form: NgForm) {
    if(!form.valid) {
      return false;
    } else {
      this.message = ''
      this.error = ''
      this.data.load = true
      if (this.data.component_id && this.data.form_id) {
        if (!this.update) {
          this.formService
            .saveFormRevision(this.data)
            .subscribe((response:any) => {
              if (response.success) {
                this.setUpdateData(response.id)

                this.message = response.message
                this.error = ''
                this.loadRefreshPage = true;
                this.modal = false
                setTimeout( () => {
                  document.getElementById("closeModal").click()
                  this.data = {id: null, component_id: null, form_id: null, questions: [], client_id: localStorage.getItem('client_id'), type_system_id: this.route.snapshot.paramMap.get('id'), load: false}
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
            .saveFormRevision(this.data)
            .subscribe((response:any) => {
              if (response.success) {
                this.setUpdateData(response.id)

                this.message = response.message
                this.error = ''
                this.loadRefreshPage = true;
                this.modal = false
                setTimeout( () => {
                  document.getElementById("closeModal").click()
                  this.data = {id: null, component_id: null, form_id: null, questions: [], client_id: localStorage.getItem('client_id'), type_system_id: this.route.snapshot.paramMap.get('id'), load: false}
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
      }
    }
  }

  sendRefresh() {
    this.refresh.emit(this.loadRefreshPage)
    if (this.loadRefreshPage) this.loadRefreshPage = false;
  }

  setUpdateData($event) {
    console.log($event)
    this.updateData.emit($event)
  }

}