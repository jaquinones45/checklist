import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeSystemComponent } from './type-system.component';

import { FormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Routes, RouterModule } from '@angular/router';

import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

import { TablaTypeSystemComponent } from './components/tabla-type-system/tabla-type-system.component';
import { FormTypeSystemComponent } from './components/form-type-system/form-type-system.component';

const routes: Routes = [
  {
    path: '',
    component: TypeSystemComponent
  }
];
@NgModule({
  declarations: [
    TypeSystemComponent,
    //Tabla
    TablaTypeSystemComponent,
    //Form
    FormTypeSystemComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgbModule,
    DropDownListModule
  ]
})
export class TypeSystemModule { }
