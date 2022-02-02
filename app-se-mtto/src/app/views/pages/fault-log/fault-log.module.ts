import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaultLogComponent } from './fault-log.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: FaultLogComponent
  }
];
@NgModule({
  declarations: [FaultLogComponent],
  imports: [
  CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class FaultLogModule { }
