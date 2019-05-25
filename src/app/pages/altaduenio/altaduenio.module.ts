import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AltaduenioPage } from './altaduenio.page';

const routes: Routes = [
  {
    path: '',
    component: AltaduenioPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AltaduenioPage]
})
export class AltaduenioPageModule {}
