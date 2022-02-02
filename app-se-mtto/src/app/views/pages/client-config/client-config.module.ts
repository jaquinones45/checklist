import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';

import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

import { ClientConfigComponent } from './client-config.component';

import { ElementsModule } from '../../../elements/elements.module'

const routes: Routes = [
  {
    path: '',
    component: ClientConfigComponent
  }
];
@NgModule({
  declarations: [
    ClientConfigComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgbModule,
    DropDownListModule,
    ElementsModule,
  ]
})
export class ClientConfigModule { }
