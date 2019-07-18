import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ClienteconfirmapedidoPage } from './clienteconfirmapedido.page';

const routes: Routes = [
  {
    path: '',
    component: ClienteconfirmapedidoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ClienteconfirmapedidoPage]
})
export class ClienteconfirmapedidoPageModule {}
