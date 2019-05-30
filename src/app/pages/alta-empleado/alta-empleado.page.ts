import { Component, OnInit,  ViewChild } from '@angular/core';
//import { IonicPage, NavController, NavParams, Slides, LoadingController,Loading } from 'ionic-angular';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {Camera, CameraOptions} from '@ionic-native/camera';
//import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
//import { AngularFireAuth } from 'angularfire2/auth';
import { IUsuario } from '../../clases/usuario';
//import {UsuariosProvider} from '../../../providers/usuarios/usuarios';
//import {AuthProvider} from '../../../providers/auth/auth';
import {EmpleadosService} from '../../services/empleados/empleados.service';
import { FotosService } from '../../services/fotos/fotos.service';

@Component({
  selector: 'app-alta-empleado',
  templateUrl: './alta-empleado.page.html',
  styleUrls: ['./alta-empleado.page.scss'],
})
export class AltaEmpleadoPage implements OnInit {

  empleados: any;
  nombre: string;
  apellido: number;
  dni: string;
  cuil:number
  foto:string;
  perfil:string;
  email:string;

  constructor(private empleadosService: EmpleadosService) { }

  ngOnInit() {
    this.empleadosService.TraerEmpleados().subscribe(data => {

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
  }

  CreateRecord() {
    let record = {};
    record['nombre'] = this.nombre;
    record['apellido'] = this.apellido;
    record['dni'] = this.dni;
    record['cuil'] = this.cuil;
    record['foto'] = this.foto;
    record['perfil'] = this.perfil;
    record['email'] = this.email;

    this.empleadosService.AltaEmpleado(record).then(resp => {
      this.nombre = "";
      this.apellido = undefined;
      this.dni = "";
      this.cuil = 0;
      this.foto = "";
      this.perfil = "";
      this.email = "";
      console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
  }

  EditRecord(record) {
    record.isEdit = true;
    record.EditName = record.nombre;
    record.EditApellido = record.apellido;
    record.EditDni = record.dni;
    record.EditCuil = record.cuil;
    record.EditFoto = record.foto;
    record.EditPerfil = record.perfil;
    record.EditEmail = record.email;
  }

  UpdateRecord(recordRow) {
    let record = {};
    record['nombre'] = recordRow.EditName;
    record['apellido'] = recordRow.EditApellido;
    record['dni'] = recordRow.EditDni;
    record['cuil'] = recordRow.EditCuil;
    record['foto'] = recordRow.EditFoto;
    record['perfil'] = recordRow.EditPerfil;
    record['email'] = recordRow.EditEmail;
    this.empleadosService.ModificarEmpleado(recordRow.id, record);
    recordRow.isEdit = false;
  }

  RemoveRecord(rowID) {
    this.empleadosService.EliminarEmpleado(rowID);
  }


}
