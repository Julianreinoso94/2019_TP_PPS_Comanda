import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EncuestaGraficosPage } from './encuesta-graficos.page';

const routes: Routes = [
  {
    path: '',
    component: EncuestaGraficosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EncuestaGraficosPage]
})
export class EncuestaGraficosPageModule {}
