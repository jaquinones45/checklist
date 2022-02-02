import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios.component';

import { Routes, RouterModule } from '@angular/router';
import { TablaUsuariosComponent } from './components/tabla-usuarios/tabla-usuarios.component';
import { FormUsuarioComponent } from './components/form-usuario/form-usuario.component';
import { SliderRoundCheckedComponent } from './components/slider-round-checked/slider-round-checked.component';

const routes: Routes = [
  {
    path: '',
    component: UsuariosComponent
  }
];
@NgModule({
  declarations: [
    UsuariosComponent, 
    TablaUsuariosComponent,
    FormUsuarioComponent,
    SliderRoundCheckedComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class UsuariosModule { }
