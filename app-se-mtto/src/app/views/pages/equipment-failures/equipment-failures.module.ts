import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentFailuresComponent } from './equipment-failures.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: EquipmentFailuresComponent
  }
];
@NgModule({
  declarations: [EquipmentFailuresComponent],
  imports: [
  CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class EquipmentFailuresModule { }
