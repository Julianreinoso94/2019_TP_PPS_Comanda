import { PedidosService } from 'src/app/services/pedidos.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MesasService } from '../../services/mesas/mesas.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FotosService } from '../../services/fotos/fotos.service';
import { EmpleadosService } from 'src/app/services/empleados/empleados.service';
import { ToastController } from '@ionic/angular';
import { isBoolean } from 'util';

@Component({
  selector: 'app-alta-pedido',
  templateUrl: './alta-pedido.page.html',
  styleUrls: ['./alta-pedido.page.scss'],
})
export class AltaPedidoPage implements OnInit {

  loading = false;
  pedidos : any;

  constructor(
    private router: Router,
    private mesasService: MesasService,
    // private camara: Camera,
    public fotoService: FotosService,
    public toastCtrl: ToastController,
    private pedidosService: PedidosService
  ) { }

  ngOnInit() {

    this.pedidosService.TraerPedidos().subscribe(data => {

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


  cargarPedido(
    codigoPedido: number,
    codigoMesa: number,
    codigoProducto: number,
    cantidad: number,
    tipoPedido: string,
    detalle: string,
    idEmpleado: number
    //estado: string,
    //cliente: string
  ): void {

    if (
      codigoPedido === undefined ||
      codigoMesa === undefined ||
      codigoProducto === undefined ||
      cantidad === undefined ||
      tipoPedido === undefined ||
      detalle === undefined ||
      idEmpleado === undefined
      //estado === undefined
    ) {

      return;
    }
    this.loading = true;
    this.pedidosService
      .crearPedido(codigoPedido, codigoMesa, codigoProducto, cantidad, tipoPedido, detalle, 'Pendiente', idEmpleado)
      .then(() => {
        this.loading = false;
        //this.mostrarToast("Se cargó el empleado con exito","successToast");
        this.mostrarToast("Se cargo el pedido con exito", "successToast");
        this.router.navigateByUrl('/alta-pedido')
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


}
