import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AltaAnonimoPage } from './alta-anonimo.page';

const routes: Routes = [
  {
    path: '',
    component: AltaAnonimoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AltaAnonimoPage]
})
export class AltaAnonimoPageModule {}
