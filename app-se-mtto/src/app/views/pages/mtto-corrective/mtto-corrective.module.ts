import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { FormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MttoCorrectiveComponent } from './mtto-corrective.component';

import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

import { TablaMttoCorrectiveComponent } from './components/tabla-mtto-corrective/tabla-mtto-corrective.component';
import { FormMttoCorrectiveComponent } from './components/form-mtto-corrective/form-mtto-corrective.component';

const routes: Routes = [
  {
    path: '',
    component: MttoCorrectiveComponent
  }
];
@NgModule({
  declarations: [
    MttoCorrectiveComponent,
    //Tabla
    TablaMttoCorrectiveComponent,
    //Form
    FormMttoCorrectiveComponent
  ],
  imports: [
  CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgbModule,
    DropDownListModule
  ]
})
export class MttoCorrectiveModule { }
