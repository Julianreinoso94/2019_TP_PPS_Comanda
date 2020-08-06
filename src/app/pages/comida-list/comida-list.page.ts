import { Component, OnInit } from '@angular/core';
import { ComidasService } from '../../services/comidas/comidas.service';
import { ProfileService } from '../../services/user/profile.service';
import {Tab1Page} from '../../tab1/tab1.page'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comida-list',
  templateUrl: './comida-list.page.html',
  styleUrls: ['./comida-list.page.scss'],
})
export class ComidaListPage implements OnInit {

  public comidasList: Array<any>;
  public userProfile: any;
  public comidas: any;
  public bebidas: any;
  public postres: any;

  idiomaSeleccionado:any;
  array:any=[];


  constructor(
    private comidasService: ComidasService,private route: ActivatedRoute, private tabpag:Tab1Page,
    private profileService: ProfileService
  ) {}

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
            tipo: snap.data().tipo
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


      this.comidasService.traerComidas().subscribe(data => {
      
        this.comidas = data.map(e => {
          return {
            id: e.payload.doc.id,
            isEdit: false,
            codigo: e.payload.doc.data()['comidaCodigo'],
            nombre: e.payload.doc.data()['name'],
            tipo: e.payload.doc.data()['tipo'],
            precio: e.payload.doc.data()['price'],
            tiempo: e.payload.doc.data()['time'],
          };
        })
        console.log(this.comidas);
      });

      
      this.comidasService.traerBebidas().subscribe(data => {
        this.bebidas = data.map(e => {
          return {
            id: e.payload.doc.id,
            isEdit: false,
            codigo: e.payload.doc.data()['comidaCodigo'],
            nombre: e.payload.doc.data()['name'],
            tipo: e.payload.doc.data()['tipo'],
            precio: e.payload.doc.data()['price'],
            tiempo: e.payload.doc.data()['time'],
          };
        })
        console.log(this.bebidas);
      });

      this.comidasService.traerPostres().subscribe(data => {
        this.postres = data.map(e => {
          return {
            id: e.payload.doc.id,
            isEdit: false,
            codigo: e.payload.doc.data()['comidaCodigo'],
            nombre: e.payload.doc.data()['name'],
            tipo: e.payload.doc.data()['tipo'],
            precio: e.payload.doc.data()['price'],
            tiempo: e.payload.doc.data()['time'],
          };
        })
        console.log(this.postres);
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
