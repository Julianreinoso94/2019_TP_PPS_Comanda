import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SupervisorDeliveryPage } from './supervisor-delivery.page';

const routes: Routes = [
  {
    path: '',
    component: SupervisorDeliveryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SupervisorDeliveryPage]
})
export class SupervisorDeliveryPageModule {}
