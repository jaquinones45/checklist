import { Component, EventEmitter, Input, Output} from '@angular/core';
import { NgForm } from '@angular/forms';

import { NgbModalConfig, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { TypeSystemService } from 'src/app/core/services/type-system.service'

@Component({
  selector: 'app-form-type-system',
  templateUrl: './form-type-system.component.html',
  styleUrls: ['./form-type-system.component.scss']
})
export class FormTypeSystemComponent {
  closeResult = ''
  load: boolean = false
  modal: boolean = false
  plants: any = []
  @Input() id
  @Input() nombre
  @Input() data = {id: null, name: '', plant_id: null, client_id: localStorage.getItem('client_id'), load: false}
  @Input() update: boolean = false
  @Output() refresh = new EventEmitter<any>();
  
  loadRefreshPage = false

  public localFields: Object = { text: 'name' }
  loadPlant: boolean;
  responsePlant: any;
  message: string = '';
  error: string = '';

  constructor(
    private modalService: NgbModal, 
    private typeSystemService: TypeSystemService,
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

    this.getPlant()

    this.message = ''
    this.error = ''
    console.log(this.data)
    if (!this.update) this.data = {id: null, name: '', plant_id: null, client_id: localStorage.getItem('client_id'), load: false}

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

  getPlant() {
    const params = {
      client_id: localStorage.getItem('client_id'),
    }
    this.loadPlant = false
    this.typeSystemService
        .getPlantName(params)
        .subscribe((res:any) => {
            this.responsePlant = res.data;
            this.loadPlant = true
        });
  }

  clickSaveOrUpdate(form: NgForm) {
    if(!form.valid) {
      return false;
    } else {
      this.message = ''
      this.error = ''
      this.data.load = true
      if (!this.update) {
        this.typeSystemService
          .saveTypeSystem(this.data)
          .subscribe((response:any) => {
            this.loadRefreshPage = true;
            if (response.success) {
              this.message = response.message
              this.error = ''
              this.modal = false
              setTimeout( () => {
                document.getElementById("closeModal").click()
                this.data = {id: null, name: '', plant_id: null, client_id: localStorage.getItem('client_id'), load: false}
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
        this.typeSystemService
          .updateTypeSystem(this.data)
          .subscribe((response:any) => {
            this.loadRefreshPage = true;
            if (response.success) {
              this.message = response.message
              this.error = ''
              this.modal = false
              setTimeout( () => {
                document.getElementById("closeModal").click()
                this.data = {id: null, name: '', plant_id: null, client_id: localStorage.getItem('client_id'), load: false}
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

  sendRefresh() {
    this.refresh.emit(this.loadRefreshPage)
    if (this.loadRefreshPage) this.loadRefreshPage = false;
  }

}