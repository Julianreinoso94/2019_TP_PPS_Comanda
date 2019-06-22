import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { QringresolocalPage } from './qringresolocal.page';

const routes: Routes = [
  {
    path: '',
    component: QringresolocalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [QringresolocalPage]
})
export class QringresolocalPageModule {}
