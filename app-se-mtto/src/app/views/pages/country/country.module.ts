import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryComponent } from './country.component';

import { FormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Routes, RouterModule } from '@angular/router';

import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

import { TablaCountryComponent } from './components/tabla-country/tabla-country.component';
import { FormCountryComponent } from './components/form-country/form-country.component';

const routes: Routes = [
  {
    path: '',
    component: CountryComponent
  }
];
@NgModule({
  declarations: [
    CountryComponent,
    //Tabla
    TablaCountryComponent,
    //Form
    FormCountryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgbModule,
    DropDownListModule
  ]
})
export class CountryModule { }
