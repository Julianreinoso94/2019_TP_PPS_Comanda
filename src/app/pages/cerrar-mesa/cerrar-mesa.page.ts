import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MesasService } from '../../services/mesas/mesas.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FotosService } from '../../services/fotos/fotos.service';
import { EmpleadosService } from 'src/app/services/empleados/empleados.service';
import { ToastController } from '@ionic/angular';
import { isBoolean } from 'util';
import {Tab1Page} from '../../tab1/tab1.page'
import {  ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-cerrar-mesa',
  templateUrl: './cerrar-mesa.page.html',
  styleUrls: ['./cerrar-mesa.page.scss'],
})
export class CerrarMesaPage implements OnInit {

  loading = false;
  mesas : any;
  reservas: any;
  reservaserv: any;
  listaEspera: any;
  eventService: any;
  
idiomaSeleccionado:any;
array:any=[];

  constructor(
    private router: Router,
    private mesasService: MesasService,
    // private camara: Camera,
    private route: ActivatedRoute, private tabpag:Tab1Page,
    public fotoService: FotosService,
    public toastCtrl: ToastController
  ) {

    // this.reservaserv.TraerReservas().subscribe(data => {

    //   this.reservas = data.map(e => {
    //     return {
    //       id: e.payload.doc.id,
    //       isEdit: false,
    //       usuario: e.payload.doc.data()['usuario'],
    //       cantidad: e.payload.doc.data()['cantidad'],
    //       estado: e.payload.doc.data()['estado'],


    //       horareserva: e.payload.doc.data()['horareserva'],
    //       fechareserva: e.payload.doc.data()['fechareserva'],
  
    //       };
    //   })
    // });
   }

  ionViewWillEnter(){

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

    this.mesasService.TraerMesasDisponibles().subscribe(data => {
      
            this.mesas = data.map(e => {
              return {
                id: e.payload.doc.id,
                isEdit: false,
                codigo: e.payload.doc.data()['codigo'],
                estado: e.payload.doc.data()['estado'],
                tipo: e.payload.doc.data()['tipo'],
                cantPersonas: e.payload.doc.data()['cantPersonas'],
                cliente: e.payload.doc.data()['cliente'],
                monto: e.payload.doc.data()['monto'],
                propina: e.payload.doc.data()['propina'],
                descuento10: e.payload.doc.data()['descuento10'],
                descuentoBebida: e.payload.doc.data()['descuentoBebida'],
                descuentoPostre: e.payload.doc.data()['descuentoPostre'],
              };
            })
            console.log(this.mesas);
          });
  }

  CerrarMesaaa(record) {
    
    let mesa = {};
    mesa['estado'] = "Disponible";
    mesa['propina'] = 0;
    mesa['descuentoBebida'] = false;
    mesa['descuentoPostre'] = false;
    mesa['descuento10'] = false;
    mesa['monto'] = 0;

     this.mesasService.ModificarMesa( record.id, mesa);
    //limpiar
    this.mostrarToast("Se cerró la mesa con exito", "successToast");

  }

  CerrarMesa(recordRow) {
    let record = {};
    record['estado'] = 'Disponible';
    record['cliente'] = '';
    record['descuento10'] = false;
    record['descuentoBebida'] = false;
    record['descuentoPostre'] = false;
    record['propina'] = '';
    record['monto'] = 0;

    this.mesasService.ModificarMesa(recordRow.id, record);
    recordRow.isEdit = false;

    
    this.mostrarToast("Se cerró la mesa con exito", "successToast");
    this.router.navigateByUrl('/cerrar-mesa');
  }

  async mostrarToast(miMsj:string,color:string) 
  {
    let toast = await this.toastCtrl.create({
      showCloseButton: true,
      closeButtonText:"cerrar",
      cssClass: color,
      message: miMsj,
      duration: 3000,
      position: 'top'
    });
    return await toast.present();
  }

}
