import { Component, OnInit } from '@angular/core';
import { ComidasService } from '../../services/comidas/comidas.service';
import { ProfileService } from '../../services/user/profile.service';
@Component({
  selector: 'app-comida-list',
  templateUrl: './comida-list.page.html',
  styleUrls: ['./comida-list.page.scss'],
})
export class ComidaListPage implements OnInit {

  public comidasList: Array<any>;
  public userProfile: any;

  constructor(
    private comidasService: ComidasService,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    this.comidasService
      .getComidasList().orderBy('name', 'asc')
      .get()
      .then(comidasListSnapshot => {
        this.comidasList = [];
        comidasListSnapshot.forEach(snap => {
          this.comidasList.push({
            id: snap.id,
            name: snap.data().name,
            description: snap.data().description,
            price: snap.data().price,
            time: snap.data().time,
          });
          // return false;
        });
      });

    this.profileService
      .getUserProfile()
      .get()
      .then( userProfileSnapshot => {
        this.userProfile = userProfileSnapshot.data();
      });
  }

  ionViewWillEnter() {
    this.ngOnInit();
  }
  borrarComida(id) {
    this.comidasService.deleteComida(id);
    this.ngOnInit();
    // this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }
}
