import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PedidosService } from 'src/app/services/pedidos.service';
import { AuthService } from 'src/app/services/user/auth.service';
import { ProfileService } from 'src/app/services/user/profile.service';

@Component({
  selector: 'app-tomarpedidosbar',
  templateUrl: './tomarpedidosbar.page.html',
  styleUrls: ['./tomarpedidosbar.page.scss'],
})
export class TomarpedidosbarPage implements OnInit {

  pedidos : any;

      public userProfile: any;
      public birthDate: Date;
      public perfil:string;
      public valor="hola";
      price: any = '';
      mimesa:Array<any>;


  constructor(    public toastCtrl: ToastController,
      private pedidosService: PedidosService, private authService: AuthService,
          private profileService: ProfileService) { }

  ngOnInit() {
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
        
    this.pedidos.forEach(element => {//TRAE MESA DEL USUARIO
      if(element.tipoPedido == "bebida")
      {
        this.mimesa = element.id
      }
    });

          this.profileService
            .getUserProfile()
            .get()
            .then( userProfileSnapshot => {
              this.userProfile = userProfileSnapshot.data();
              console.log(this.userProfile);
              this.birthDate = userProfileSnapshot.data().birthDate;
              this.perfil= userProfileSnapshot.data().perfil;
              //alert(this.perfil)
            });
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

  UpdateRecord(recordRow) {
    let record = {};
    record['estadoPedido'] ="ListoParaentregar";
    record['tiempoEstimado'] = recordRow.EditTipo;
    this.pedidosService.ModificarPedido(recordRow.id, record);
    recordRow.isEdit = false;
    this.mostrarToast("Se editó el pedido con exito", "successToast");
   // this.router.navigateByUrl('/alta-pedido');
  }

}