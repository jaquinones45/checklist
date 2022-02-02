import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilesComponent } from './files.component'
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FilesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: FilesComponent
      },
    ]),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class FilesModule { }
