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

@Component({
  selector: 'app-reserva-cliente',
  templateUrl: './reserva-cliente.page.html',
  styleUrls: ['./reserva-cliente.page.scss'],
})
export class ReservaClientePage implements OnInit {
 dia:any;
 horario:any;
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

  ngOnInit() {
  }

  constructor(private comidaService: ComidasService,
    private router: Router,  private empleadosService: EmpleadosService,
    private mesasService: MesasService,
    // private camara: Camera,
    public fotoService: FotosService,
    public toastCtrl: ToastController,
    private pedidosService: PedidosService
  ) {
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



   

   hacerReserva(
    // codigoPedido: number,
     codigoMesa: number,
 
   ): void {
  alert ("Entro a hacer reserva");
  alert(codigoMesa);
     
     this.loading = true;
  
 
 
       this.mesasService.ModificarEstadoDeunaMesa(codigoMesa,"Reservada");
       alert("actualizomeza");
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
     record.EditCliente = record.cliente;
   }
 
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
