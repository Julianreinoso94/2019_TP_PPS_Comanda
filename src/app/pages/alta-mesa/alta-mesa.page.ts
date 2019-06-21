import { Component, OnInit } from '@angular/core';
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
  selector: 'app-alta-mesa',
  templateUrl: './alta-mesa.page.html',
  styleUrls: ['./alta-mesa.page.scss'],
})
export class AltaMesaPage implements OnInit {

  public fotoMesa: string = null;
  loading = false;
  mesas : any;
  today = Date.now();
   ddMMyyyy:String ;
  

  constructor(
    private router: Router,private datePipe: DatePipe,
    private mesasService: MesasService,
    // private camara: Camera,
    public fotoService: FotosService,
    public toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.ddMMyyyy = this.datePipe.transform(new Date(),"dd-MM-yyyy");

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
                estadobool:false,
                };
            })
            console.log(this.mesas);
          });
  }


  cargarMesa(
    codigo: number,
    cantPersonas: number,
    tipo: string
    //estado: string,
    //cliente: string
  ): void {

    if (
      codigo === undefined ||
      cantPersonas === undefined ||
      tipo === undefined
      //estado === undefined
    ) {

      return;
    }
    this.loading = true;
    this.mesasService
      .crearMesa(codigo, cantPersonas, tipo, 'Disponible', this.fotoService.photos, '', false, false, false, 0, 0,this.today.toString(),"ss")
      .then(() => {
        this.loading = false;
        //this.mostrarToast("Se cargó el empleado con exito","successToast");
        this.mostrarToast("Se cargo la mesa con exito", "successToast");
        this.router.navigateByUrl('/alta-mesa');
        this.fotoService.photos = [];
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
    record.EditCodigo = record.codigo;
    record.EditEstado = record.estado;
    record.EditTipo = record.tipo;
    record.EditCliente = record.cliente;
  }

  UpdateRecord(recordRow) {
    let record = {};
    record['codigo'] = recordRow.EditCodigo;
    record['estado'] = recordRow.EditEstado;
    record['tipo'] = recordRow.EditTipo;
    record['cliente'] = recordRow.EditCliente;
    this.mesasService.ModificarMesa(recordRow.id, record);
    recordRow.isEdit = false;
    this.mostrarToast("Se editó la mesa con exito", "successToast");
    this.router.navigateByUrl('/alta-mesa');
  }


  RemoveRecord(rowID) {
    this.mesasService.EliminarMesa(rowID);
    this.mostrarToast("Se eliminó la mesa con exito", "successToast");
    this.router.navigateByUrl('/alta-mesa');
  }











}
