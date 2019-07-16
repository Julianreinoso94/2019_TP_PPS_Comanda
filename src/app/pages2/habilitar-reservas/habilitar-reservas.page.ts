import { Component, OnInit } from '@angular/core';
import { ReservasService } from 'src/app/services/reservas/reservas.service';
import { Router } from '@angular/router';
import { MesasService } from '../../services/mesas/mesas.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FotosService } from '../../services/fotos/fotos.service';
import { EmpleadosService } from 'src/app/services/empleados/empleados.service';
import { ToastController } from '@ionic/angular';
import { isBoolean } from 'util';
import { timeout } from 'q';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-habilitar-reservas',
  templateUrl: './habilitar-reservas.page.html',
  styleUrls: ['./habilitar-reservas.page.scss'],
})
export class HabilitarReservasPage implements OnInit {
  reservas : any;

  constructor(public reservaserv:ReservasService,    public toastCtrl: ToastController ,private router: Router,private datePipe: DatePipe
    ) { }

  ngOnInit() {
    this.reservaserv.TraerReservas().subscribe(data => {

      this.reservas = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          usuario: e.payload.doc.data()['usuario'],
          horareserva: e.payload.doc.data()['horareserva'],
          fechareserva: e.payload.doc.data()['fechareserva'],
          // cantPersonas: e.payload.doc.data()['cantPersonas'],
          // cliente: e.payload.doc.data()['cliente'],
          // monto: e.payload.doc.data()['monto'],
          // propina: e.payload.doc.data()['propina'],
          // descuento10: e.payload.doc.data()['descuento10'],
          // descuentoBebida: e.payload.doc.data()['descuentoBebida'],
          // descuentoPostre: e.payload.doc.data()['descuentoPostre'],
          // estadobool:false,
          };
      })
      //console.log(this.mesas);
    });
  }

  EditRecord(record) {
    let codigo = record;
    this.reservaserv.AceptarReservaPendiente(codigo,"aprobada");
    this.mostrarToast("Se habilito con exito la reserva.", "successToast");

    this.router.navigateByUrl('/home');
  }
  UpdateRecord(recordRow) {
    let record = {};
    record['codigo'] = recordRow.EditCodigo;
    record['estado'] = recordRow.EditEstado;
    record['tipo'] = recordRow.EditTipo;
    record['cliente'] = recordRow.EditCliente;
   // this.mesasService.ModificarMesa(recordRow.id, record);
    recordRow.isEdit = false;
    this.router.navigateByUrl('/home');
  }


  RemoveRecord(rowID) {
    this.reservaserv.EliminarReserva(rowID);
    this.mostrarToast("Se eliminó la Reserva con exito", "successToast");
    this.router.navigateByUrl('/alta-mesa');
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
