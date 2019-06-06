import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MesasService } from '../../services/mesas/mesas.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FotosService } from '../../services/fotos/fotos.service';
import { EmpleadosService } from 'src/app/services/empleados/empleados.service';
import { ToastController } from '@ionic/angular';
import { isBoolean } from 'util';


@Component({
  selector: 'app-abrir-mesa',
  templateUrl: './abrir-mesa.page.html',
  styleUrls: ['./abrir-mesa.page.scss'],
})
export class AbrirMesaPage implements OnInit {

  loading = false;
  mesas : any;

  constructor(
    private router: Router,
    private mesasService: MesasService,
    // private camara: Camera,
    public fotoService: FotosService,
    public toastCtrl: ToastController
  ) { }

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
