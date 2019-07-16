import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event/event.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
})
export class IngresoPage implements OnInit {

  public listaEspera: Array<any>;
  constructor(private eventService: EventService,    public toastCtrl: ToastController,
    private router: Router) {}

  ngOnInit() {
    this.eventService.getListaEspera().subscribe(data => {

      this.listaEspera = data.map(e => {
        return {
          id: e.payload.doc.id,
         // isEdit: false,
          estado: e.payload.doc.data()['estado'],
          uid: e.payload.doc.data()['uid'],
        //  fechareserva: e.payload.doc.data()['fechareserva'],
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
     // console.log(this.listadeespera);
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
   let codigo = record;
    this.eventService.AceptarClientelistaEspera(codigo,"asignandomesa");
    this.mostrarToast("El cliente ya esta listo para tomar la mesa.", "successToast");

    this.router.navigateByUrl('/home');

  }

  UpdateRecord(recordRow) {
    let record = {};
    record['codigo'] = recordRow.EditCodigo;
    record['estado'] = recordRow.EditEstado;
    record['tipo'] = recordRow.EditTipo;
    record['cliente'] = recordRow.EditCliente;
   // this.eventService.ModificarMesa(recordRow.id, record);

    recordRow.isEdit = false;
    this.router.navigateByUrl('/alta-mesa');
  }


  RemoveRecord(rowID) {
    this.eventService.EliminarClientelistaEspera(rowID);
    this.mostrarToast("Se eliminó al cliente con exito", "successToast");
    this.router.navigateByUrl('/home');
  }




}
