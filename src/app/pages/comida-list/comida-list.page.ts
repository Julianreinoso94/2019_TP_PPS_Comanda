import { Component, OnInit } from '@angular/core';
import { ComidasService } from '../../services/comidas/comidas.service';

@Component({
  selector: 'app-comida-list',
  templateUrl: './comida-list.page.html',
  styleUrls: ['./comida-list.page.scss'],
})
export class ComidaListPage implements OnInit {

  public comidasList: Array<any>;
  constructor(private comidasService: ComidasService) {}

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
