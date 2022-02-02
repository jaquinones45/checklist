import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeComponentComponent } from './type-component.component';

import { FormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Routes, RouterModule } from '@angular/router';

import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

import { TablaTypeComponentComponent } from './components/tabla-type-component/tabla-type-component.component';
import { TypeComponentTypeComponentComponent } from './components/form-type-component/form-type-component.component';

const routes: Routes = [
  {
    path: '',
    component: TypeComponentComponent
  }
];
@NgModule({
  declarations: [
    TypeComponentComponent,
    //Tabla
    TablaTypeComponentComponent,
    //TypeComponent
    TypeComponentTypeComponentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgbModule,
    DropDownListModule
  ]
})
export class TypeComponentModule { }
