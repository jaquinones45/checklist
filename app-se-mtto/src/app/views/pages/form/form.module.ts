import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component';

import { FormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Routes, RouterModule } from '@angular/router';

import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
//Tabla
import { TablaFormComponent } from './components/tabla-form/tabla-form.component';
import { TablaFormQuestionComponent } from './components/tabla-form-question/tabla-form-question.component';
//Form
import { FormFormComponent } from './components/form-form/form-form.component';
import { FormFormQuestionComponent } from './components/form-form-question/form-form-question.component';

const routes: Routes = [
  {
    path: '',
    component: FormComponent
  }
];
@NgModule({
  declarations: [
    FormComponent,
    //Tabla
    TablaFormComponent,
    TablaFormQuestionComponent,
    //Form
    FormFormComponent,
    FormFormQuestionComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgbModule,
    DropDownListModule
  ]
})
export class FormModule { }
