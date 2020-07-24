import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { environment } from '../environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private fcm: FCM,    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar, public translate: TranslateService
  ) {

    translate.addLangs(['en', 'nl']);
    translate.setDefaultLang('en');

    this.initializeApp();

    
  }

  initializeApp() {
    firebase.initializeApp(environment.firebase);
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.fcm.subscribeToTopic('people');

          this.fcm.getToken().then(token => {
            console.log(token);
          });
//Agregue esta función para recibir notificaciones push de Firebase Cloud Messaging.
          this.fcm.onNotification().subscribe(data => {
            console.log(data);
            if (data.wasTapped) {
              console.log('Received in background');
              this.router.navigate([data.landing_page, data.price]);
            } else {
              console.log('Received in foreground');
              this.router.navigate([data.landing_page, data.price]);
            }
          });

          this.fcm.onTokenRefresh().subscribe(token => {
            console.log(token);
          });

          // this.fcm.unsubscribeFromTopic('marketing');
        });
      }
    }
