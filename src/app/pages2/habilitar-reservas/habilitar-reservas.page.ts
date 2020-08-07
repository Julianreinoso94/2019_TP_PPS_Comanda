import { Component, OnInit } from '@angular/core';
import { ReservasService } from 'src/app/services/reservas/reservas.service';
import { Router } from '@angular/router';
import { MesasService } from '../../services/mesas/mesas.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FotosService } from '../../services/fotos/fotos.service';
import { EmpleadosService } from 'src/app/services/empleados/empleados.service';
import { ToastController } from '@ionic/angular';
import { isBoolean } from 'util';
import { timeout } from 'q';
import { DatePipe } from '@angular/common';

import {Tab1Page} from '../../tab1/tab1.page'
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-habilitar-reservas',
  templateUrl: './habilitar-reservas.page.html',
  styleUrls: ['./habilitar-reservas.page.scss'],
})
export class HabilitarReservasPage implements OnInit {
  reservas : any;
  mesaelegida:any;
  mesas:any;
  idiomaSeleccionado:any;
  array:any=[];
  

  constructor(private route: ActivatedRoute, private tabpag:Tab1Page,public reservaserv:ReservasService, public mesasService:MesasService,   public toastCtrl: ToastController ,private router: Router,private datePipe: DatePipe
    ) { }

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
    this.mesasService.TraerMesas().subscribe(data => {

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
    this.reservaserv.TraerReservas().subscribe(data => {

      this.reservas = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          usuario: e.payload.doc.data()['usuario'],
          cantidad: e.payload.doc.data()['cantidad'],
          estado: e.payload.doc.data()['estado'],


          horareserva: e.payload.doc.data()['horareserva'],
          fechareserva: e.payload.doc.data()['fechareserva'],
          // cantPersonas: e.payload.doc.data()['cantPersonas'],
          // cliente: e.payload.doc.data()['cliente'],
          // monto: e.payload.doc.data()['monto'],
          // propina: e.payload.doc.data()['propina'],
          // descuento10: e.payload.doc.data()['descuento10'],
          // descuentoBebida: e.payload.doc.data()['descuentoBebida'],
          // descuentoPostre: e.payload.doc.data()['descuentoPostre'],
          // estadobool:false,
          };
      })
      //console.log(this.mesas);
    });

  }

  EditRecord(record) {
    // let codigo = record;
    this.reservaserv.AceptarReservaPendiente(record,"aprobada",this.mesaelegida);
    this.mostrarToast("Se habilito con exito la reserva.", "successToast");

    this.router.navigateByUrl('/home');
  }
  UpdateRecord(recordRow) {
    let record = {};
    record['codigo'] = recordRow.EditCodigo;
    record['estado'] = recordRow.EditEstado;
    record['tipo'] = recordRow.EditTipo;
    record['cliente'] = recordRow.EditCliente;
   // this.mesasService.ModificarMesa(recordRow.id, record);
    recordRow.isEdit = false;
    this.router.navigateByUrl('/home');
  }


  RemoveRecord(rowID) {
    this.reservaserv.EliminarReserva(rowID);
    this.mostrarToast("Se eliminó la Reserva con exito", "successToast");
    this.router.navigateByUrl('/home');
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
