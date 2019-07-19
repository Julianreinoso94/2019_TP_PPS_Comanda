import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TomarPedidoDeliveryPage } from './tomar-pedido-delivery.page';

const routes: Routes = [
  {
    path: '',
    component: TomarPedidoDeliveryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TomarPedidoDeliveryPage]
})
export class TomarPedidoDeliveryPageModule {}
