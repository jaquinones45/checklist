import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpiComponent } from './kpi.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: KpiComponent
  }
];
@NgModule({
  declarations: [KpiComponent],
  imports: [
  CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class KpiModule { }
