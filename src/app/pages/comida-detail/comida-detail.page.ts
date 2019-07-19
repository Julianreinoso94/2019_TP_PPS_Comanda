import { Component, OnInit } from '@angular/core';
import { ComidasService } from '../../services/comidas/comidas.service';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Imagenes } from '../../../environments/environment';

@Component({
  selector: 'app-comida-detail',
  templateUrl: './comida-detail.page.html',
  styleUrls: ['./comida-detail.page.scss'],
})
export class ComidaDetailPage implements OnInit {
  public comidaActual: any = {};
  listaImagenes: any;
  public comidaAct: any;
  

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  ref = firebase.database().ref('listaComida/');

  constructor(
    private comidaService: ComidasService,
    private route: ActivatedRoute,
  ) {
    
    this.ref.on('value', resp => {
      this.listaImagenes = Imagenes(resp);
    });
  }


  ngOnInit() {
    const comidaId: string = this.route.snapshot.paramMap.get('id');
    this.comidaService
      .getDetalleComida(comidaId)
      .get()
      .then(eventSnapshot => {
        this.comidaActual = eventSnapshot.data();
        this.comidaActual.id = eventSnapshot.id;
        console.log(this.comidaActual.id);
        console.log(this.comidaActual.name);
      });    
  }





}
