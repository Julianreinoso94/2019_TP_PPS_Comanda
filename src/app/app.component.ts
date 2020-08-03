import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { environment } from '../environments/environment';
import { TranslateService } from '@ngx-translate/core';
import {  OnInit, Inject, PLATFORM_ID, Optional } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent  implements OnInit {
  title = 'angular-9-i18n';
  langs = ['en', 'fr'];
 
  constructor(
    private platform: Platform,
    private fcm: FCM,    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,    private translate: TranslateService,
  ) {
    this.initializeApp();
  }

  public useLanguage(): void {
    alert("entr app")
    // this.translateService.setDefaultLang(lang);
  }
 

  public ngOnInit(): void {
    
  }
  initializeApp() {
    // this.translate.use(‘LANG_CODE’)

    firebase.initializeApp(environment.firebase);
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.fcm.subscribeToTopic('people');



          // this.fcm.unsubscribeFromTopic('marketing');
        });

        this.translate.setDefaultLang('en'); // add this

      }

    }
