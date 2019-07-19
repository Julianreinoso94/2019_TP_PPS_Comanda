import { Component, ViewChild, AfterContentInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComidasService } from 'src/app/services/comidas.service';
import { EmpleadosService } from 'src/app/services/empleados/empleados.service';
import { MesasService } from 'src/app/services/mesas/mesas.service';
import { ToastController } from '@ionic/angular';
import { PedidosService } from 'src/app/services/pedidos.service';
import { FotosService } from 'src/app/services/fotos/fotos.service';
declare var google;

import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { EventService } from '../../services/event/event.service';
import { DeliveryService } from 'src/app/services/delivery/delivery.service';
//import { threadId } from 'worker_threads';
@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.page.html',
  styleUrls: ['./delivery.page.scss'],
})
export class DeliveryPage implements  OnInit, AfterContentInit {
  empleados: any;
  public comidaActual: any = {};
  public mesaActual: any = {};

  public currentUser: firebase.User;
  uidUsuario:any;

mimesa:any;
  loading = false;
  pedidos : any;
  cantidad = 1;
  mesas : any;
  precioUnitario=0;
  public comidasList: Array<any>;
  codigoProducto:string;
  codigoMesa:any;
  ActualizarmontoTotalmesa:number;
  preciototalpedido:number;
  montoTotal:number;
   a:String;
  map;
  @ViewChild('mapElement') mapElement;
  constructor(private comidaService: ComidasService,private deliveryServ:DeliveryService,
    private router: Router,  private empleadosService: EmpleadosService,
    private mesasService: MesasService,
    // private camara: Camera,
    public fotoService: FotosService,
    public toastCtrl: ToastController,
    private pedidosService: PedidosService) { 
    
    firebase.auth().onAuthStateChanged(user => {
 
      this.currentUser = user;
      this.uidUsuario = user.uid});
    
  }


  montoMesa()
  {
   this.pedidosService.TraerPedidosPorMesa(this.mimesa).subscribe(data => {

     this.pedidos = data.map(e => {
       return {
         id: e.payload.doc.id,
         isEdit: false,
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
    this.mesasService.getDetalleMesa(this.codigoMesa)
    .get()
    .then(eventSnapshot => {

     this.mesaActual = eventSnapshot.data();
     this.mesaActual.id = eventSnapshot.id;
   });

  }
  
  calcularprecio()
  {
    this.comidaService
      .getDetalleComida(this.codigoProducto)
      .get()
      .then(eventSnapshot => {

        this.comidaActual = eventSnapshot.data();
        this.comidaActual.id = eventSnapshot.id;
      });
// this.preciototalpedido=0;
 this.cantidad=1;


  }
  cambioproducto()
  {
    this.preciototalpedido=this.precioUnitario;

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
    
    this.pedidosService.TraerPedidosPorTipoBebida().subscribe(data => {

      this.pedidos = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
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
    this.comidaService.getComidasList().subscribe(data => {
      
      this.comidasList = [];

    this.comidasList = data.map(e => {
      return {
        id: e.payload.doc.id,
        name: e.payload.doc.data()['name'],
        price: e.payload.doc.data()['description'],
        time: e.payload.doc.data()['time'],
        tipo: e.payload.doc.data()['tipo'],
      
      };
    })
    console.log(this.comidasList);
  });
  }
  ngAfterContentInit(): void {
    this.map = new google.maps.Map(
        this.mapElement.nativeElement,
        {
          center: {lat:  -34.6506 , lng: -58.3822,},
          zoom: 16
        });
  }
  cargarPedido(
    // codigoPedido: number,
     codigoProducto: string,
     cantidad: string,
     tipoPedido: string,
     detalle: string,
     idEmpleado: number,
     //cliente: string,
     //montoTotal:string,
   preciototalpedido:number,
   montoTotal:number,
 
   ): void {
     if (
      // codigoPedido === undefined ||
 
       this.codigoProducto == undefined ||
       this.cantidad == undefined     ) {
       // alert(codigoProducto);
       // alert(cantidad);
       return;
     }
 
     
     
     this.loading = true;
     let tipoproducto:any
     console.log(this.comidasList);
     console.log(this.codigoProducto);
    this.comidasList.forEach(element => {
      if(element.id == this.codigoProducto)
      {
        tipoproducto=element.tipo;
      }
    });
     this.pedidosService
       .crearPedido(1, this.uidUsuario, this.codigoProducto, tipoproducto, 'PendienteDelivery',this.cantidad,0,this.preciototalpedido)
       .then(() => {
        this.loading = false;
         this.mostrarToast("Se cargo el pedido con exito", "successToast");
       });
 
       //actualizar el monto total
 
       // alert(this.preciototalpedido);
   alert(this.preciototalpedido);
   alert(this.montoTotal);
       this.ActualizarmontoTotalmesa= +this.montoTotal + +this.preciototalpedido;
       // alert("el monto de la mesa es"+this.ActualizarmontoTotalmesa);
 alert(this.ActualizarmontoTotalmesa);
       this.mesasService.ModificarMontoDeunaMesa(this.mimesa,this.ActualizarmontoTotalmesa);
       // alert("actualizomeza");
 
       this.router.navigateByUrl('/home')
 
   }

   cargarDelivery(
  
  ): void {

    // if (
    //   codigo === undefined ||
    //   cantPersonas === undefined ||
    //   tipo === undefined
    //   //estado === undefined
    // ) {

    //   return;
    // }
    this.loading = false;
    this.deliveryServ
      .crearDelivery( this.uidUsuario,"dirrecion","0","cero",false,false,false, 'PendienteDelivery')
      .then(() => {
        this.loading = false;
        //this.mostrarToast("Se cargó el empleado con exito","successToast");
        this.mostrarToast("Se cargo el delivery con Exito", "successToast");
        // this.router.navigateByUrl('/alta-mesa');
        this.fotoService.photos = [];
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


  // crearDelivery(
  //   codigo: number,
  //   cantPersonas: number,
  //   tipo: string
  //   //estado: string,
  //   //cliente: string
  // ): void {

  //   // if (
  //   //   codigo === undefined ||
  //   //   //estado === undefined
  //   // ) {

  //   //   return;
  //   // }
  //   this.loading = true;
  //   this.deliveryServ
  //     .crearDelivery(codigo, cantPersonas, tipo, 'Disponible', this.fotoService.photos, '', false, false, false, 0, 0,this.today.toString(),"ss")
  //     .then(() => {
  //       this.loading = false;
  //       //this.mostrarToast("Se cargó el empleado con exito","successToast");
  //       this.mostrarToast("Se cargo la mesa con exito", "successToast");
  //       this.router.navigateByUrl('/alta-mesa');
  //       this.fotoService.photos = [];
  //     });
  // }

  private increment () {

    this.cantidad++;
     this.preciototalpedido=this.cantidad*this.precioUnitario;
  
  }
  
  // TraerMontoMesa(id){
  //
  // }
  private decrement () {
    if(this.cantidad==1)
    {
      this.cantidad=1;
  
    }
    else
    {
      this.cantidad--;
      this.preciototalpedido=this.preciototalpedido-this.precioUnitario;
    }
  }
}
