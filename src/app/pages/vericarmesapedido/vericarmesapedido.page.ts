import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PedidosService } from 'src/app/services/pedidos.service';
import { AuthService } from 'src/app/services/user/auth.service';
import { ProfileService } from 'src/app/services/user/profile.service';


import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
@Component({
  selector: 'app-vericarmesapedido',
  templateUrl: './vericarmesapedido.page.html',
  styleUrls: ['./vericarmesapedido.page.scss'],
})
export class VericarmesapedidoPage implements OnInit {
  public currentUser: firebase.User;
  uidUsuario:any;

  pedidos : any;
  pedidosentregar: any;

      public userProfile: any;
      public birthDate: Date;
      public perfil:string;
      public valor="hola";
      price: any = '';


  constructor(    public toastCtrl: ToastController,
      private pedidosService: PedidosService, private authService: AuthService,
          private profileService: ProfileService) {
            firebase.auth().onAuthStateChanged(user => {
 
              this.currentUser = user;
              this.uidUsuario = user.uid});
           }

          ngOnInit() {
            
    this.pedidosService.confirmarRecepcion(this.uidUsuario).subscribe(data => {

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


  confirmado(id)

  {
    alert("entregar");
    this.pedidosService.entregarpedido(id, "Confirmado");

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


