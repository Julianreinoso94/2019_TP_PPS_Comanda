import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { Camera } from '@ionic-native/camera/ngx';
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { environment } from '../environments/environment';
//import { AngularFireModule } from 'angularfire2';
import {AngularFireStorageModule} from '@angular/fire/storage';

import { AngularFireModule } from '@angular/fire';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FCM } from '@ionic-native/fcm/ngx';//PLUGIN PUSH NOTIFICATION
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,AngularFireModule.initializeApp(environment.firebase),
AngularFirestoreModule,    AngularFireStorageModule,
    AngularFireDatabaseModule,
   IonicModule.forRoot(), AppRoutingModule, ReactiveFormsModule],
  providers: [
   StatusBar,FCM,
    StatusBar,
    SplashScreen,BarcodeScanner,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
