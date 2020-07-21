import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { CommonModule }  from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormGroup , FormControl } from '@angular/forms';
import { Camera } from '@ionic-native/camera/ngx';
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { environment } from '../environments/environment';
//import { AngularFireModule } from 'angularfire2';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {DatePipe} from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FCM } from '@ionic-native/fcm/ngx';//PLUGIN PUSH NOTIFICATION
import { Calendar } from '@ionic-native/calendar/ngx';
import {DateFnsModule} from 'ngx-date-fns';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { Base64 } from '@ionic-native/base64/ngx';


// Componentes externos que realizan peticiones
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


export function customTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,    
    DateFnsModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,    
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    IonicModule.forRoot(), 
    AppRoutingModule, 
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: customTranslateLoader,
        deps: [HttpClient]
      }
    }),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicStorageModule.forRoot()
   ],
  providers: [
   StatusBar,FCM,DatePipe,Calendar,
    StatusBar,
    SplashScreen,BarcodeScanner,
    WebView,
    Base64,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule {}
