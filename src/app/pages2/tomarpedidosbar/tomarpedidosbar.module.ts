import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TomarpedidosbarPage } from './tomarpedidosbar.page';

const routes: Routes = [
  {
    path: '',
    component: TomarpedidosbarPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TomarpedidosbarPage]
})
export class TomarpedidosbarPageModule {}
