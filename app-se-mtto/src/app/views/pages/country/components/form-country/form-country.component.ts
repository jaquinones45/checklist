import { Component, EventEmitter, Input, Output} from '@angular/core';
import { NgForm } from '@angular/forms';

import { NgbModalConfig, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { CountryService } from 'src/app/core/services/country.service'

@Component({
  selector: 'app-form-country',
  templateUrl: './form-country.component.html',
  styleUrls: ['./form-country.component.scss']
})
export class FormCountryComponent {
  closeResult = ''
  load: boolean = false
  modal: boolean = false
  plants: any = []
  @Input() id
  @Input() nombre
  @Input() data = {id: null, name: '', alias: '', load: false}
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
    private typeSystemService: CountryService,
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

    this.message = ''
    this.error = ''

    if (!this.update) this.data = {id: null, name: '', alias: '', load: false}

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
      this.message = ''
      this.error = ''
      this.data.load = true
      if (!this.update) {
        this.typeSystemService
          .saveCountry(this.data)
          .subscribe((response:any) => {
            this.loadRefreshPage = true;
            if (response.success) {
              this.message = response.message
              this.error = ''
              this.modal = false
              setTimeout( () => {
                document.getElementById("closeModal").click()
                this.data = {id: null, name: '', alias: '', load: false}
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
          .updateCountry(this.data)
          .subscribe((response:any) => {
            this.loadRefreshPage = true;
            if (response.success) {
              this.message = response.message
              this.error = ''
              this.modal = false
              setTimeout( () => {
                document.getElementById("closeModal").click()
                this.data = {id: null, name: '', alias: '', load: false}
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