import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LenguajePopoverPage } from './lenguaje-popover.page';

const routes: Routes = [
  {
    path: '',
    component: LenguajePopoverPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LenguajePopoverPage]
})
export class LenguajePopoverPageModule {}
