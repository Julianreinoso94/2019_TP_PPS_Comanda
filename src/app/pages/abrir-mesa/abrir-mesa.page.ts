import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MesasService } from '../../services/mesas/mesas.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FotosService } from '../../services/fotos/fotos.service';
import { EmpleadosService } from 'src/app/services/empleados/empleados.service';
import { ToastController } from '@ionic/angular';
import { isBoolean } from 'util';
import { ReservasService } from 'src/app/services/reservas/reservas.service';
import { EventService } from 'src/app/services/event/event.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {Tab1Page} from '../../tab1/tab1.page'
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-abrir-mesa',
  templateUrl: './abrir-mesa.page.html',
  styleUrls: ['./abrir-mesa.page.scss'],
})
export class AbrirMesaPage implements OnInit {
  public listaEspera: Array<any>;
  pedidos : any;

  public currentUser: firebase.User;
  uidUsuario:any;
  loading = false;
  mesas : any;
  reservas : any;

  
idiomaSeleccionado:any;
array:any=[];


  constructor(
    private router: Router,private eventService: EventService, public reservaserv:ReservasService, 
    private mesasService: MesasService, private route: ActivatedRoute, private tabpag:Tab1Page,   private pedidosService: PedidosService,

    // private camara: Camera,
    public fotoService: FotosService,
    public toastCtrl: ToastController
  ) {
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

    firebase.auth().onAuthStateChanged(user => {
 
      this.currentUser = user;
      this.uidUsuario = user.uid});
    

    this.pedidosService.TraerPedidos().subscribe(data => {

      this.pedidos = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          idCliente:e.payload.doc.data()['idCliente'],
          codigoPedido: e.payload.doc.data()['codigoPedido'],
          codigoProducto: e.payload.doc.data()['codigoProducto'],
          codigoMesa: e.payload.doc.data()['codigoMesa'],
          detallePedido: e.payload.doc.data()['detallePedido'],
          estadoPedido: e.payload.doc.data()['estadoPedido'],
          tipoPedido: e.payload.doc.data()['tipoPedido'],
          cantidad: e.payload.doc.data()['cantidad'],
          monto: e.payload.doc.data()['monto'],
          idMozo: e.payload.doc.data()['idEmpleado']
        };
      })
      console.log(this.pedidos);
    });
    this.eventService.getListaEspera().subscribe(data => {

      this.listaEspera = data.map(e => {
        return {
          id: e.payload.doc.id,
         // isEdit: false,
          estado: e.payload.doc.data()['estado'],
          uid: e.payload.doc.data()['uid'],
        //  fechareserva: e.payload.doc.data()['fechareserva'],
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
     // console.log(this.listadeespera);
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

  IonViewWillEnter()
  {
   
  }

  ngOnInit() {

   

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

  
  EditRecord(record) {

    let mesa = {};
    mesa['estado'] = "Disponible";
    mesa['propina'] = 0;
    mesa['descuentoBebida'] = false;
    mesa['descuentoPostre'] = false;
    mesa['descuento10'] = false;
    mesa['monto'] = 0;


    this.pedidos.forEach(element => {
      if(element.codigoMesa == record.id){
        this.pedidosService.EliminarPedido(element.id);
      }
    });
    this.pedidos.forEach(element => {
      if(element.idCliente == this.uidUsuario){
        this.pedidosService.EliminarPedido(element.id);
      }
    });
     this.mesasService.ModificarMesa( record.id, mesa);
     this.mesasService.Modificarclientedeunamesa( record.id);

    // alert("entro");
    record.isEdit = true;
    record.EditEstado = record.estado;
    record.EditCliente = record.cliente;
   let idborrar;
   let idclientelistaespera;

    this.reservas.forEach(element => {
      if(record.cliente == element.usuario){
        alert("entro");
        idborrar=element.id
        console.log(idborrar);
      }
      
    });
    this.reservaserv.EliminarReserva(idborrar);

    ///lo elimina de listaespera
    this.listaEspera.forEach(element => {
      if(record.cliente == element.uid){
        //alert("entro");
        idclientelistaespera=element.id
      }
      
    });
    this.eventService.EliminarClientelistaEspera(idclientelistaespera);
   

  }

     
  // let record = {};
  // record['estado'] = "Disponible";
  // record['cliente'] = "";
  // record['descuento10'] = false;
  // record['descuentoBebida'] = false;
  // record['descuentoPostre'] = false;
  // record['estado'] = "Disponible";
  // record['monto'] = 0;
  // record['propina'] = 0;


  // this.mesasService.ModificarMesa( this.codigoMesa, record);

  UpdateRecord(recordRow) {
    let record = {};
    record['estado'] = recordRow.EditEstado;
    record['cliente'] = recordRow.EditCliente;
    this.mesasService.ModificarMesa(recordRow.id, record);
    recordRow.isEdit = false;
    this.mostrarToast("Se editó la mesa con exito", "successToast");
    this.router.navigateByUrl('/abrir-mesa');
  }

}
