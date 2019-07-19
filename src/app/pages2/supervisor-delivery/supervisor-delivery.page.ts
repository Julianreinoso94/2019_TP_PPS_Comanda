import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PedidosService } from 'src/app/services/pedidos.service';
import { ProfileService } from 'src/app/services/user/profile.service';
import { AuthService } from 'src/app/services/user/auth.service';

@Component({
  selector: 'app-supervisor-delivery',
  templateUrl: './supervisor-delivery.page.html',
  styleUrls: ['./supervisor-delivery.page.scss'],
})
export class SupervisorDeliveryPage   implements OnInit {

  pedidos : any;
  pedidosentregar: any;

      public userProfile: any;
      public birthDate: Date;
      public perfil:string;
      public valor="hola";
      price: any = '';


  constructor(    public toastCtrl: ToastController,
      private pedidosService: PedidosService, private authService: AuthService,
          private profileService: ProfileService) { }

          ngOnInit() {
            
    this.pedidosService.confirmarpedidosdelivery().subscribe(data => {

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
         
          // this.profileService
          //   .getUserProfile()
          //   .get()
          //   .then( userProfileSnapshot => {
          //     this.userProfile = userProfileSnapshot.data();
          //     console.log(this.userProfile);
          //     this.birthDate = userProfileSnapshot.data().birthDate;
          //     this.perfil= userProfileSnapshot.data().perfil;
          //     //alert(this.perfil)
          //   });
          //  console.log(this.userProfile.perfil);
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
    this.pedidosService.entregarpedido(id, "EnProcesoDelivery");

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