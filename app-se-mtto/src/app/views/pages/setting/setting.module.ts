import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';

import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

import { SettingComponent } from './setting.component';

import { ModulePlantComponent } from '../../../elements/module-plant/module-plant.component'
import { ModuleComponentComponent } from '../../../elements/module-component/module-component.component'
import { ModuleEquipmentComponent } from '../../../elements/module-equipment/module-equipment.component'

const routes: Routes = [
  {
    path: '',
    component: SettingComponent
  }
];
@NgModule({
  declarations: [
    SettingComponent,
    ModulePlantComponent,
    ModuleComponentComponent,
    ModuleEquipmentComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgbModule,
    DropDownListModule,
  ]
})
export class SettingModule { }