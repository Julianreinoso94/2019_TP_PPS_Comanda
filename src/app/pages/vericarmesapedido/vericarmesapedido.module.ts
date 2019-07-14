import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VericarmesapedidoPage } from './vericarmesapedido.page';

const routes: Routes = [
  {
    path: '',
    component: VericarmesapedidoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VericarmesapedidoPage]
})
export class VericarmesapedidoPageModule {}
