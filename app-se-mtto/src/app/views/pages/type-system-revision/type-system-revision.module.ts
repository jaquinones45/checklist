import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeSystemComponent } from './type-system-revision.component';

import { FormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap' ;

import { Routes, RouterModule } from '@angular/router';

import { DatePickerModule  } from '@syncfusion/ej2-angular-calendars';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

import { TablaTypeSystemRevisionComponent } from './components/tabla-type-system-revision/tabla-type-system-revision.component';
import { TablaRevisionFormComponent } from './components/tabla-revision-form/tabla-revision-form.component';

import { FormTypeSystemRevisionComponent } from './components/form-type-system-revision/form-type-system-revision.component';
import { FormRevisionFormComponent } from './components/form-revision-form/form-revision-form.component';

import { ModalTypeSystemRevisionDetailComponent } from './components/modal-type-system-revision-detail/modal-type-system-revision-detail.component'

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
    TablaTypeSystemRevisionComponent,
    TablaRevisionFormComponent,
    //Form
    FormTypeSystemRevisionComponent,
    FormRevisionFormComponent,
    //Modal
    ModalTypeSystemRevisionDetailComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgbModule,
    DatePickerModule,
    DropDownListModule,
  ]
})
export class TypeSystemRevisionModule { }
