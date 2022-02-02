import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentInventoryComponent } from './equipment-inventory.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: EquipmentInventoryComponent
  }
];
@NgModule({
  declarations: [EquipmentInventoryComponent],
  imports: [
  CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class EquipmentInventoryModule { }
