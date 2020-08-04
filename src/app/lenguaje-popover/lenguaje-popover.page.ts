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

    // this.languages= this.getLanguages("idioma");
  }

  // getLanguages(continente){
  
  //    switch(continente){
  //    case "idioma":
  //    return[
  //      {text:'ENG', value:'en',img:'assets/paises/eng.png'},
  //      {text:'GER', value:'de',img:'assets/paises/de.png'},
  //      {text:'RUS', value:'rus',img:'assets/paises/rus.png'},
  //      {text:'ESP', value:'esp',img:'assets/paises/esp.png'},
  //      {text:'POR', value:'por',img:'assets/paises/por.png'},
  //      {text:'FRA', value:'fr',img:'assets/paises/fr.png'},
 
  //    ]
  //    break;
  
  // }
 
  //  }


  ClosePopover()
  {
   this.popover.dismiss();
  }
} 