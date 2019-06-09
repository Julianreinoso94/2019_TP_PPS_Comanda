import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FCM } from '@ionic-native/fcm/ngx';

import * as firebase from 'firebase/app';
import { environment } from '../environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,  private fcm: FCM

  ) {
    this.initializeApp();
  }

  initializeApp() {
    firebase.initializeApp(environment.firebase);
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.fcm.getToken().then(token => {
  console.log(token);
});

this.fcm.onTokenRefresh().subscribe(token => {
  console.log(token);
});

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
    });
  }
}
