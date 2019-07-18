import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TipoRegistroPage } from './tipo-registro.page';

const routes: Routes = [
  {
    path: '',
    component: TipoRegistroPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TipoRegistroPage]
})
export class TipoRegistroPageModule {}
