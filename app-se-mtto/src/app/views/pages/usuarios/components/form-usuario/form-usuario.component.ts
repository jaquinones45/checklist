import { Component, EventEmitter, Input, Output} from '@angular/core';
import { NgForm } from '@angular/forms';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.scss']
})
export class FormUsuarioComponent {
  closeResult = ''
  load: boolean = false
  modal: boolean = false
  plants: any = []
  @Input() id
  @Input() nombre
  @Input() data = {'id': '', 'name': '', 'email': '', 'password': '', 'phone': '', 'status': true}
  @Input() update: boolean = false
  @Output() refresh = new EventEmitter<any>();
  
  loadRefreshPage = false

  public localFields: Object = { text: 'name' }

  constructor(
    private modalService: NgbModal, 

    ) { }

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
    
    if (!this.update) this.data = {'id': '', 'name': '', 'email': '', 'password': '', 'phone': '', 'status': true}

    this.modalService.open(content,
      { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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
      /*if (!this.update) {
        this.service.saveUsuario(this.data)
          .subscribe((response:any) => {
              if (response.success) {
                this.modal = false

                this.data = {'id': '', 'name': '', 'email': '', 'password': '', 'phone': '', 'status': true}

                this.loadRefreshPage = true;

                document.getElementById("closeModal").click()
                Swal.fire({text: response.message})
              }
          },
          error => {
            console.log(error);
          })
      } else {
        this.service.updateUsuario(this.data.id, this.data)
          .subscribe((response:any) => {
            if (response.success) {
              this.modal = false

              this.data = {'id': '', 'name': '', 'email': '', 'password': '', 'phone': '', 'status': true}

              this.loadRefreshPage = true;

              document.getElementById("closeModal").click()
              Swal.fire({text: response.message})
            }
          },
          error => {
            console.log(error);
          })
      }*/
    }
  }

  updateStatus(element) {
    element.status = !element.status
  }

  sendRefresh() {
    this.refresh.emit(this.loadRefreshPage)
    if (this.loadRefreshPage) this.loadRefreshPage = false;
  }

}