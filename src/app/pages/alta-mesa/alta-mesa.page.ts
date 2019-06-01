import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MesasService } from '../../services/mesas/mesas.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FotosService } from '../../services/fotos/fotos.service';
import { EmpleadosService } from 'src/app/services/empleados/empleados.service';

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
    public fotoService: FotosService
  ) { }

  ngOnInit() {

    this.mesasService.TraerMesas().subscribe(data => {
      
            this.mesas = data.map(e => {
              return {
                //id: e.payload.doc.id,
                isEdit: false,
                id: e.payload.doc.data()['id'],
                estado: e.payload.doc.data()['estado'],
                tipo: e.payload.doc.data()['tipo'],
               
              };
            })
            console.log(this.mesas);
          });
  }

  

  cargarMesa(
    mesaId: number,
    mesaCantPersonas: number,
    mesaTipo: string,
    mesaEstado: string
  ): void {

    if (
      mesaId === undefined ||
      mesaCantPersonas === undefined ||
      mesaTipo === undefined ||
      mesaEstado === undefined
    ) {
      return;
    }
    this.loading = true;
    this.mesasService
      .crearMesa(mesaId, mesaCantPersonas, mesaTipo, mesaEstado, this.fotoService.photos)
      .then(() => {
        this.router.navigateByUrl('');
        this.fotoService.photos = [];
        this.loading = false;
      });
  }

  EditRecord(record) {
    record.isEdit = true;
    //record.EditId = record.id;
    record.EditEstado = record.estado;
    record.EditTipo = record.tipo;
  }

  UpdateRecord(recordRow) {
    let record = {};
    record['estado'] = recordRow.EditEstado;
    record['tipo'] = recordRow.EditTipo;
    this.mesasService.ModificarMesa(recordRow.id, record);
    recordRow.isEdit = false;
  }

  RemoveRecord(rowID) {
    this.mesasService.EliminarMesa(rowID);
  }







}
