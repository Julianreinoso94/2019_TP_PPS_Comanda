import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Tab1Page } from './tab1.page';
import{PopoverPageModule} from '../popover/popover.module';
import { TranslateModule } from '@ngx-translate/core'; // add this


const routes: Routes = [
  {
    path: '',
    component: Tab1Page
  }
];

@NgModule({
  imports: [
  CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Tab1Page]
  // entryComponents :[PopoverPage]
})
export class Tab1PageModule {}
