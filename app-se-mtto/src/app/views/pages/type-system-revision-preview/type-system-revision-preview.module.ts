import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeSystemRevisionPreviewComponent } from './type-system-revision-preview.component';

import { FormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap' ;

import { TabModule } from '@syncfusion/ej2-angular-navigations';

import { Routes, RouterModule } from '@angular/router';

import { DateTimePickerModule  } from '@syncfusion/ej2-angular-calendars';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

import { TablaRevisionFormComponent } from './components/tabla-revision-form/tabla-revision-form.component';

const routes: Routes = [
  {
    path: '',
    component: TypeSystemRevisionPreviewComponent
  }
];
@NgModule({
  declarations: [
    TypeSystemRevisionPreviewComponent,
    //Tabla
    TablaRevisionFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgbModule,
    DateTimePickerModule,
    DropDownListModule,
    TabModule,
  ]
})
export class TypeSystemRevisionPreviewModule { }
