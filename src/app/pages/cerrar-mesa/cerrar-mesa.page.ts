import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MesasService } from '../../services/mesas/mesas.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FotosService } from '../../services/fotos/fotos.service';
import { EmpleadosService } from 'src/app/services/empleados/empleados.service';
import { ToastController } from '@ionic/angular';
import { isBoolean } from 'util';


@Component({
  selector: 'app-cerrar-mesa',
  templateUrl: './cerrar-mesa.page.html',
  styleUrls: ['./cerrar-mesa.page.scss'],
})
export class CerrarMesaPage implements OnInit {

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

    this.mesasService.TraerMesasDisponibles().subscribe(data => {
      
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

  CerrarMesaaa(record) {
    record.isEdit = true;
    record.EditEstado = record.estado;
    record.EditCliente = record.cliente;
    record.Editdescuento10 = record.descuento10;
    record.EditdescuentoBebida = record.descuentoBebida;
    record.EditdescuentoPostre = record.descuentoPostre;
    record.EditPropina = record.propina;
    record.EditMonto = record.monto;
  }

  CerrarMesa(recordRow) {
    let record = {};
    record['estado'] = 'Disponible';
    record['cliente'] = '';
    record['descuento10'] = false;
    record['descuentoBebida'] = false;
    record['descuentoPostre'] = false;
    record['propina'] = '';
    record['monto'] = 0;

    this.mesasService.ModificarMesa(recordRow.id, record);
    recordRow.isEdit = false;
    this.mostrarToast("Se cerró la mesa con exito", "successToast");
    this.router.navigateByUrl('/cerrar-mesa');
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
