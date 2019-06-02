import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MesasService } from '../../services/mesas/mesas.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FotosService } from '../../services/fotos/fotos.service';
import { EmpleadosService } from 'src/app/services/empleados/empleados.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-alta-mesa',
  templateUrl: './alta-mesa.page.html',
  styleUrls: ['./alta-mesa.page.scss'],
})
export class AltaMesaPage implements OnInit {

  public fotoMesa: string = null;
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
               
              };
            })
            console.log(this.mesas);
          });
  }


  cargarMesa(
    codigo: number,
    cantPersonas: number,
    tipo: string,
    estado: string
  ): void {

    if (
      codigo === undefined ||
      cantPersonas === undefined ||
      tipo === undefined ||
      estado === undefined
    ) {
     
      return;
    }
    this.loading = true;
    this.mesasService
      .crearMesa(codigo, cantPersonas, tipo, estado, this.fotoService.photos)
      .then(() => {
        this.loading = false;
        //this.mostrarToast("Se cargó el empleado con exito","successToast");
        this.mostrarToast("Se cargo la mesa con exito", "successToast");
        this.router.navigateByUrl('/home');
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
  }

  UpdateRecord(recordRow) {
    let record = {};
    record['codigo'] = recordRow.EditCodigo;
    record['estado'] = recordRow.EditEstado;
    record['tipo'] = recordRow.EditTipo;
    this.mesasService.ModificarMesa(recordRow.id, record);
    recordRow.isEdit = false;
  }

  RemoveRecord(rowID) {
    this.mesasService.EliminarMesa(rowID);
  }

  









}
