import { PedidosService } from 'src/app/services/pedidos.service';
import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/user/auth.service";
import { ToastController } from '@ionic/angular';
import { ProfileService } from '../../services/user/profile.service';

import {Tab1Page} from '../../tab1/tab1.page'
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-tomarpedidos',
  templateUrl: './tomarpedidos.page.html',
  styleUrls: ['./tomarpedidos.page.scss'],
})
export class TomarpedidosPage implements OnInit {
  idiomaSeleccionado:any;
array:any=[];


  pedidos : any;
  pedidosentregar: any;

      public userProfile: any;
      public birthDate: Date;
      public perfil:string;
      public valor="hola";
      price: any = '';


  constructor(    public toastCtrl: ToastController,private route: ActivatedRoute, private tabpag:Tab1Page,
      private pedidosService: PedidosService, private authService: AuthService,
          private profileService: ProfileService) { }

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
            
    this.pedidosService.confirmarpedidosclientes().subscribe(data => {

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
          this.pedidosService.TraerPedidosListoParaentregar().subscribe(data => {

            this.pedidosentregar = data.map(e => {
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


  entregarPedido(id)

  {
    alert("entregar");
    this.pedidosService.entregarpedido(id, "Entregado");

  }
  rechazarPedido(id)

  {
    this.pedidosService.entregarpedido(id, "Rechazado");

  }
  PedidoAprobado(id)

  {
    this.pedidosService.entregarpedido(id, "EnProceso");

  }

  UpdateRecord(recordRow) {
    let record = {};
    record['estadoPedido'] = recordRow.EditEstado;
    record['tipoPedido'] = recordRow.EditTipo;
    this.pedidosService.ModificarPedido(recordRow.id, record);
    recordRow.isEdit = false;
    this.mostrarToast("Se editó el pedido con exito", "successToast");
   // this.router.navigateByUrl('/alta-pedido');
  }



}
