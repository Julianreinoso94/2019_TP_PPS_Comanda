import { PedidosService } from 'src/app/services/pedidos.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MesasService } from '../../services/mesas/mesas.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FotosService } from '../../services/fotos/fotos.service';
import { EmpleadosService } from 'src/app/services/empleados/empleados.service';
import { ToastController } from '@ionic/angular';
import { isBoolean } from 'util';
import { ComidasService } from 'src/app/services/comidas/comidas.service';

import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { EventService } from '../../services/event/event.service';
//import { threadId } from 'worker_threads';

@Component({
  selector: 'app-alta-pedido',
  templateUrl: './alta-pedido.page.html',
  styleUrls: ['./alta-pedido.page.scss'],
})
export class AltaPedidoPage implements OnInit {
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


  constructor(private comidaService: ComidasService,
    private router: Router,  private empleadosService: EmpleadosService,
    private mesasService: MesasService,
    // private camara: Camera,
    public fotoService: FotosService,
    public toastCtrl: ToastController,
    private pedidosService: PedidosService
  ) {

    firebase.auth().onAuthStateChanged(user => {
 
      this.currentUser = user;
      this.uidUsuario = user.uid});
    
  


   }

   ionViewWillEnter(){
    //  alert(this.uidUsuario);
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

    this.mesas.forEach(element => {//TRAE MESA DEL USUARIO
      if(element.cliente == this.uidUsuario)
      {
        this.mimesa = element.id
      }
      
    });
    // alert(this.mimesa);
    this.mesas.forEach(element => {
      if(element.id ==this.mimesa)
      {
        this.montoTotal=element.monto;
      }
    });

    alert(this.montoTotal)

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


    //trae todas la lista comidas
    this.comidaService
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
          tipo: snap.data().tipo,

        });
        // return false;
      });
    });

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

    this.empleadosService.TraerMozos().subscribe(data => {

      this.empleados = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          nombre: e.payload.doc.data()['nombre'],
          apellido: e.payload.doc.data()['apellido'],
          dni: e.payload.doc.data()['dni'],
          cuil: e.payload.doc.data()['cuil'],
          foto: e.payload.doc.data()['foto'],
          perfil: e.payload.doc.data()['perfil'],
          email: e.payload.doc.data()['email'],
        };
      })
      console.log(this.empleados);
    });

    this.pedidosService.TraerPedidosPorMesa(this.codigoMesa).subscribe(data => {

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
  }



/*
    codigoPedido: number,
    codigoMesa: number,
    codigoProducto: number,
    cantidad: number,
    tipoPedido: string,
    detalle: string,
    //estadoPedido: string,
    //horaEntrega: string,
    idEmpleado: number
*/

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

    alert ("cargarPedido");

    this.loading = true;
    let tipoproducto:any
    console.log(this.comidasList);
    console.log(this.codigoProducto);
   this.comidasList.forEach(element => {
     if(element.id == this.codigoProducto)
     {
       alert("ntyto");
       tipoproducto=element.tipo;
     }
   });
alert(tipoproducto);
    this.pedidosService
      .crearPedido(1, this.mimesa, this.codigoProducto, tipoproducto, 'Pendiente',this.cantidad,0,this.preciototalpedido)
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
    record.isEdit = true;
    record.EditEstado = record.estado;
    record.EditTipo = record.tipo;

  }

  UpdateRecord(recordRow) {
    let record = {};
    record['estadoPedido'] = recordRow.EditEstado;
    record['tipoPedido'] = recordRow.EditTipo;
    this.pedidosService.ModificarPedido(recordRow.id, record);
    recordRow.isEdit = false;
    this.mostrarToast("Se editó el pedido con exito", "successToast");
    this.router.navigateByUrl('/alta-pedido');
  }


  RemoveRecord(rowID) {
    this.pedidosService.EliminarPedido(rowID);
    this.mostrarToast("Se eliminó el pedido con exito", "successToast");
    this.router.navigateByUrl('/alta-pedido');
  }

  Cuenta(){
    this.router.navigateByUrl('cuenta');

}


}
