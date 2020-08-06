import { Component, OnInit } from '@angular/core';
import { ComidasService } from '../../services/comidas/comidas.service';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Imagenes } from '../../../environments/environment';

import {Tab1Page} from '../../tab1/tab1.page'
import { Router } from '@angular/router';

@Component({
  selector: 'app-comida-detail',
  templateUrl: './comida-detail.page.html',
  styleUrls: ['./comida-detail.page.scss'],
})
export class ComidaDetailPage implements OnInit {
  public comidaActual: any = {};
  listaImagenes: any;
  public comidaAct: any;
  
  idiomaSeleccionado:any;
  array:any=[];

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  ref = firebase.database().ref('listaComida/');

  constructor(
    private comidaService: ComidasService,private tabpag:Tab1Page,
    private route: ActivatedRoute,
  ) {
    
    this.ref.on('value', resp => {
      this.listaImagenes = Imagenes(resp);
    });
  }


  ngOnInit() {

    this.idiomaSeleccionado = this.route.snapshot.paramMap.get('lenguaje');
      
    switch(this.idiomaSeleccionado) { 
      case 'en': { 
        this.array= this.tabpag.arrayINGLES;
       break; 
      } 
      case 'rus': { 
         this.array= this.tabpag.arrayRusia;

         break; 
      } 
      case 'por': { 
        this.array= this.tabpag.arrayPor;

        break; 
     } 
     case'fr':{
       this.array=this.tabpag.arrayFra;

       break
     }
     case'esp':{
      this.array=this.tabpag.arrayEs;

      break
    }

    case'de':{
      this.array=this.tabpag.arrayDe;
      break
    } 
      default: { 
        this.array= this.tabpag.arrayEs;

         break; 
      } 
   } 
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
