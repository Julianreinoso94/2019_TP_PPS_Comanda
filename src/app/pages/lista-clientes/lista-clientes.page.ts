import { Component, OnInit } from '@angular/core';
import {ClienteService} from '../../services/clientes/cliente.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.page.html',
  styleUrls: ['./lista-clientes.page.scss'],
})
export class ListaClientesPage implements OnInit {

  clientes: any;

  constructor(
    private clienteService: ClienteService,
    public toastCtrl: ToastController
  ) { }

  ngOnInit() {

    this.clienteService.TraerClientes().subscribe(data => {

      this.clientes = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          nombre: e.payload.doc.data()['nombre'],
          apellido: e.payload.doc.data()['apellido'],
          dni: e.payload.doc.data()['dni'],
          foto: e.payload.doc.data()['foto'],
          perfil: e.payload.doc.data()['perfil'],
          email: e.payload.doc.data()['email'],
        };
      })
      console.log(this.clientes);
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

  RemoveRecord(rowID) {
    this.clienteService.EliminarCliente(rowID);
    this.mostrarToast("Se eliminó el cliente con exito", "color: Success");
  }

}
