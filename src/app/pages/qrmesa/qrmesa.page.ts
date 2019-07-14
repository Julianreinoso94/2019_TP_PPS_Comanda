import { Component, OnInit } from '@angular/core';
import { ComidasService } from '../../services/comidas/comidas.service';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../services/user/auth.service';
import { ProfileService } from 'src/app/services/user/profile.service';
import { MesasService } from 'src/app/services/mesas/mesas.service';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-qrmesa',
  templateUrl: './qrmesa.page.html',
  styleUrls: ['./qrmesa.page.scss'],
})
export class QrmesaPage implements OnInit {

  empleados: any;
  public comidaActual: any = {};
  public mesaActual: any = {};



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

  
  public userProfile: any;
  public birthDate: Date;
  public perfil:string;
  // public valor="hola";
  price: any = '';

  constructor(private comidaService: ComidasService, private mesasService: MesasService,  private authService: AuthService,
    private profileService: ProfileService,  private pedidosService: PedidosService,
    private route: ActivatedRoute) { }

  ngOnInit() {

  //   this.pedidosService.TraerPedidosPorMesa(this.codigoMesa).subscribe(data => {

  //     this.pedidos = data.map(e => {
  //       return {
  //         id: e.payload.doc.id,
  //         isEdit: false,
  //         codigoPedido: e.payload.doc.data()['codigoPedido'],
  //         codigoProducto: e.payload.doc.data()['codigoProducto'],
  //         codigoMesa: e.payload.doc.data()['codigoMesa'],
  //         detallePedido: e.payload.doc.data()['detallePedido'],
  //         estadoPedido: e.payload.doc.data()['estadoPedido'],
  //         tipoPedido: e.payload.doc.data()['tipoPedido'],
  //         cantidad: e.payload.doc.data()['cantidad'],
  //         monto: e.payload.doc.data()['monto'],
  //         idMozo: e.payload.doc.data()['idEmpleado']
  //       };
  //     })
  //     console.log(this.pedidos);
  //   });
  //   ///////////////////////////////////////////////////////////////////////////
  //   this.profileService
  //   .getUserProfile()
  //   .get()
  //   .then( userProfileSnapshot => {
  //     this.userProfile = userProfileSnapshot.data();
  //     // console.log(this.userProfile);
  //     this.birthDate = userProfileSnapshot.data().birthDate;
  //     this.perfil= userProfileSnapshot.data().perfil;
  //   });
  // //  console.log(this.userProfile.perfil);

  //   const comidaId: string = this.route.snapshot.paramMap.get('id');
  //   this.comidaService
  //     .getDetalleComida(comidaId)
  //     .get()
  //     .then(eventSnapshot => {
  //       this.comidaActual = eventSnapshot.data();
  //       this.comidaActual.id = eventSnapshot.id;
  //     });
///////////////////////////////////////////////////////////////////////////////

  }
  

  VerificarDisponibilidadMesa(idmesa)
  {
    // alert("entro a disponibilidad mesa");
    this.mesasService.TraerMesaPorCodigo("1").subscribe(data => {
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
 console.log(this.mesas);
  
  }

  reservarMesa(){
    //la mesa no tiene que estar reservada
  }

  VerificarEstadoDelPedido()
  {
    // alert("entro a estado del pedido");
  }

}
