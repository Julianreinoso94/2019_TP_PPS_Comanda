import { Component, OnInit } from '@angular/core';
import {Tab1Page} from '../../tab1/tab1.page'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tipo-registro',
  templateUrl: './tipo-registro.page.html',
  styleUrls: ['./tipo-registro.page.scss'],
})
export class TipoRegistroPage implements OnInit {
  idiomaSeleccionado:any;
  array:any=[];

  constructor(private route: ActivatedRoute,private tabpag:Tab1Page,    ) {


   }

  ngOnInit() {
    this.idiomaSeleccionado = this.route.snapshot.paramMap.get('id');

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
}



}
