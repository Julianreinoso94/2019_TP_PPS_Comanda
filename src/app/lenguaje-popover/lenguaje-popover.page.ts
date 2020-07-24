import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
// import { LanguageService } from '../services/language.service'

import { Router } from '@angular/router';


@Component({
  selector: 'app-lenguaje-popover',
  templateUrl: './lenguaje-popover.page.html',
  styleUrls: ['./lenguaje-popover.page.scss'],
})
export class LenguajePopoverPage implements OnInit {
  languages =[];

  constructor(private popover:PopoverController) {
 

  } 

  ngOnInit() {

    this.languages= this.getLanguages("idioma");
  }

  getLanguages(continente){
  
    /// console.log(this.lenguajeSeleccionado)
     switch(continente){
     case "idioma":
     return[
       {text:'ENG', value:'en',img:'assets/paises/eng.png'},
       {text:'GER', value:'de',img:'assets/paises/de.png'},
       {text:'RUS', value:'rus',img:'assets/paises/rus.png'},
       {text:'ESP', value:'esp',img:'assets/paises/esp.png'},
       {text:'POR', value:'por',img:'assets/paises/por.png'},
       {text:'FRA', value:'fr',img:'assets/paises/fr.png'},
 
     ]
     break;
  //    case "america":
  //      return[
  //       {text:'BRA', value:'por',img:'assets/img/paises/brz.png'},
  //        {text:'PAR', value:'esp',img:'assets/img/paises/par.png'},
  //        {text:'VEN', value:'rus',img:'assets/img/paises/ven.png'},
  //        {text:'CHI', value:'esp',img:'assets/img/paises/chi.png'},
  //        {text:'COL', value:'esp',img:'assets/img/paises/col.png'},
  //        {text:'URU', value:'esp',img:'assets/img/paises/uru.png'}, 
  //        {text:'BOL', value:'esp',img:'assets/img/paises/bol.png'},
  //        {text:'CAN', value:'eng',img:'assets/img/paises/can.png'},
  //        {text:'JAM', value:'eng',img:'assets/img/paises/jam.png'}, 
  //        {text:'USA', value:'eng',img:'assets/img/paises/usa.png'}, 
 
  //      ]
  //      break;
  //      case "africa":
  //     return[
  //       {text:'KEN', value:'eng',img:'assets/img/paises/ken.png'},
  //        {text:'NIG', value:'eng',img:'assets/img/paises/nig.png'},
      
  //     ]
  //      break;
  //      case "oceania":
  //        return[
  //          {text:'AUS', value:'en',img:'assets/img/paises/aus.png'},
  //           {text:'NZL', value:'en',img:'assets/img/paises/nue.png'},
         
  //        ]
  //      break;
  //      case "europa":
  //        return[
  //          {text:'ESP', value:'esp',img:'assets/img/paises/esp.png'},
  //           {text:'POR', value:'por',img:'assets/img/paises/por.png'},
         
  //        ]
  //      break;
  //      case "asia":
  //        return[
  //          {text:'RUS', value:'rus',img:'assets/img/paises/rus.png'},
  //           {text:'JPN', value:'jap',img:'assets/img/paises/jap.png'},
         
  //        ]
  //        break;
 
  }
 
   }


  ClosePopover()
  {
   this.popover.dismiss();
  }
} 