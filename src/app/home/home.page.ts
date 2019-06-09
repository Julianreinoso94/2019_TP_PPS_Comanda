import { Component } from '@angular/core';
import { ProfileService } from './../services/user/profile.service';
import {AuthService} from "./../services/user/auth.service";
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

    public userProfile: any;
    public birthDate: Date;
    public perfil:string;
    public valor="hola";


    constructor(
      private alertCtrl: AlertController,
      private authService: AuthService,
      private profileService: ProfileService,

    ) { }
  ngOnInit() {
    this.profileService
      .getUserProfile()
      .get()
      .then( userProfileSnapshot => {
        this.userProfile = userProfileSnapshot.data();
        console.log(this.userProfile);
        this.birthDate = userProfileSnapshot.data().birthDate;
        this.perfil= userProfileSnapshot.data().perfil;
      });
    //  console.log(this.userProfile.perfil);

  }

}
