import { Component, OnInit } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage implements OnInit {
  languages =[];

  constructor(private popover:PopoverController,public modal:ModalController,private _router: Router) {
 

  } 

  ngOnInit() {

    this.languages= this.getLanguages("idioma");
  }

  CloseModal()
  {
    this.modal.dismiss();
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

    }
   }

   select(valor)
   {  
     this.modal.dismiss({
      'dismissed': true
    });
    this._router.navigate(['/login',valor])
   }

  ClosePopover()
  {
   this.popover.dismiss();
  }
}