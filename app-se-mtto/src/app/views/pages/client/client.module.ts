import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client.component';

import { FormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Routes, RouterModule } from '@angular/router';

import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

import { TablaClientComponent } from './components/tabla-client/tabla-client.component';
import { FormClientComponent } from './components/form-client/form-client.component';

const routes: Routes = [
  {
    path: '',
    component: ClientComponent
  }
];
@NgModule({
  declarations: [
    ClientComponent,
    //Tabla
    TablaClientComponent,
    //Form
    FormClientComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgbModule,
    DropDownListModule
  ]
})
export class ClientModule { }
