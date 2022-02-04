import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutineMttoComponent } from './routine-mtto.component';

import { FormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap' ;

import { Routes, RouterModule } from '@angular/router';

import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

import { TablaRoutineMttoComponent } from './components/tabla-routine-mtto/tabla-routine-mtto.component';

import { ModalRoutineMttoDetailComponent } from './components/modal-routine-mtto-detail/modal-routine-mtto-detail.component';

const routes: Routes = [
  {
    path: '',
    component: RoutineMttoComponent
  }
];
@NgModule({
  declarations: [
    RoutineMttoComponent,
    //Tabla
    TablaRoutineMttoComponent,
    ModalRoutineMttoDetailComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgbModule,
    DropDownListModule
  ]
})
export class RoutineMttoModule { }
