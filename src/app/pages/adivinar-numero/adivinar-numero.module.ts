import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdivinarNumeroPage } from './adivinar-numero.page';

const routes: Routes = [
  {
    path: '',
    component: AdivinarNumeroPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdivinarNumeroPage]
})
export class AdivinarNumeroPageModule {}
