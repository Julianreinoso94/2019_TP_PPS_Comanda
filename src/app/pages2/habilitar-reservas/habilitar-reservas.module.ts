import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HabilitarReservasPage } from './habilitar-reservas.page';

const routes: Routes = [
  {
    path: '',
    component: HabilitarReservasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HabilitarReservasPage]
})
export class HabilitarReservasPageModule {}
