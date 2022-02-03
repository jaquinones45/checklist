import { Component, EventEmitter, Input, Output} from '@angular/core';
import { NgForm } from '@angular/forms';

import { NgbModalConfig, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-form-form-question',
  templateUrl: './form-form-question.component.html',
  styleUrls: ['./form-form-question.component.scss']
})
export class FormFormQuestionComponent {
  closeResult = ''
  load: boolean = false
  modal: boolean = false
  plants: any = []
  @Input() id
  @Input() nombre
  @Input() data = {id: null, name: '', question: '', form_id: null, load: false}
  @Input() form_id
  @Input() update: boolean = false
  @Output() refresh = new EventEmitter<any>();
  @Output() salidaData = new EventEmitter<any>();
  
  loadRefreshPage = false

  constructor(
    private modalService: NgbModal, 
    private config: NgbModalConfig
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

    if (!this.update) this.data = {id: null, name: '', question: '', form_id: null, load: false}

    this.modalService.open(content,
      { centered: true, ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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

  clickSaveOrUpdate(form: NgForm) {
    if(!form.valid) {
      return false;
    } else {
      this.data.load = true
      this.data.form_id = this.form_id

      this.sendSalidaData(this.data)

      document.getElementById("closeModal").click()
    }
  }

  sendRefresh() {
    this.refresh.emit(this.loadRefreshPage)
    if (this.loadRefreshPage) this.loadRefreshPage = false;
  }

  sendSalidaData($event) {
    this.salidaData.emit($event)
  }

}