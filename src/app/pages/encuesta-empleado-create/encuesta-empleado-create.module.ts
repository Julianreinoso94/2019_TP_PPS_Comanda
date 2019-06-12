import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EncuestaEmpleadoCreatePage } from './encuesta-empleado-create.page';

const routes: Routes = [
  {
    path: '',
    component: EncuestaEmpleadoCreatePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EncuestaEmpleadoCreatePage]
})
export class EncuestaEmpleadoCreatePageModule {}
