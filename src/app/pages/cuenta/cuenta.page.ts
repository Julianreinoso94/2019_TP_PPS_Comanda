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
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements  OnInit {
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
   

   montoMesa()
   {
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




 Pagar()
 {
   //Limpiar mesa
   this.ResetearMesa();
   
   //eliminar pedidos
   this.eliminarPedidos();


   //cliente pueda volver a poner en la lista de ingresantes
 
   

 }

  ResetearMesa() {
   
  let record = {};
  record['estado'] = "Disponible";
  record['cliente'] = "";
  record['descuento10'] = false;
  record['descuentoBebida'] = false;
  record['descuentoPostre'] = false;
  record['estado'] = "Disponible";
  record['monto'] = 0;
  record['propina'] = 0;


  this.mesasService.ModificarMesa( this.codigoMesa, record);
 
  this.mostrarToast("Su pago ha sido depositado exitosamente", "successToast");
  this.router.navigateByUrl('/home');
}
eliminarPedidos()
{
  this.pedidos.forEach(element => {
    this.pedidosService.EliminarPedido( element.id);
    
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

  



  
}
