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
import { Router } from '@angular/router';
import {BarcodeScannerOptions,BarcodeScanner} from "@ionic-native/barcode-scanner/ngx";
import { ToastController } from '@ionic/angular';
import { ProfileService } from '../../services/user/profile.service';

@Component({
  selector: 'app-alta-empleado',
  templateUrl: './alta-empleado.page.html',
  styleUrls: ['./alta-empleado.page.scss'],
})

export class AltaEmpleadoPage implements OnInit {

  premio:any;
  empleados: any;
  nombre: string;
  apellido: number;
  dni: any;
 /*
  cuil:number
  foto:string;
  perfil:string;
  email:string;
  */
  public fotoMesa: string = null;
  loading = false;
  encodeData: any;
  scannedData: {};
  barcodeScannerOptions: BarcodeScannerOptions;

  constructor(
    private empleadosService: EmpleadosService,
    private router: Router,
    // private camara: Camera,
    public fotoService: FotosService,
    private scanner: BarcodeScanner,
    private barcodeScanner: BarcodeScanner,
    public toastCtrl: ToastController) {

      this.barcodeScannerOptions = {
        showTorchButton: true,
        showFlipCameraButton: true
      }
    }

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

  cargarEmpleado(
    nombre: string,
    apellido: string,
    email: string,
    dni: number,
    cuil: number,
    perfil: string
  ): void {

    if (
      nombre === undefined ||
      apellido === undefined ||
      email === undefined ||
      dni === undefined ||
      cuil === undefined ||
      perfil === undefined
    ) {
      return;
    }
    this.loading = true;
    this.empleadosService
      .crearEmpleado(nombre, apellido, email, dni, cuil, perfil, this.fotoService.photos)
      .then(() => {
        this.loading = false;
        this.mostrarToast("Se cargo el empleado con exito", "successToast");
        // if (perfil=="bartender")
        // {
        //   alert("bartender");
        // }
        // if (perfil=="cocinero")
        // {
        //   alert ("cocinero");
        // }
        // if (perfil=="Mozo")
        // {
        //   alert("Mozo");
        // }
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
    record.EditNombre = record.nombre;
    record.EditApellido = record.apellido;
    record.EditDni = record.dni;
    record.EditCuil = record.cuil;
    //record.EditFoto = record.foto;
    record.EditPerfil = record.perfil;
    record.EditEmail = record.email;
  }

  UpdateRecord(recordRow) {
    let record = {};
    record['nombre'] = recordRow.EditNombre;
    record['apellido'] = recordRow.EditApellido;
    record['dni'] = recordRow.EditDni;
    record['cuil'] = recordRow.EditCuil;
   // record['foto'] = recordRow.EditFoto;
    record['perfil'] = recordRow.EditPerfil;
    record['email'] = recordRow.EditEmail;
    this.empleadosService.ModificarEmpleado(recordRow.id, record);
    recordRow.isEdit = false;
  }

  RemoveRecord(rowID) {
    this.empleadosService.EliminarEmpleado(rowID);
  }

  cargarDatosDesdeDni(datos: any) {
    // alert(datos);
    let parsedData = datos.text.split('@');
    let nombrescan = parsedData[0].toString();
    let apellido = parsedData[1].toString();
    let dniscan: number = +parsedData[2];
    this.nombre=nombrescan;
    this.apellido=apellido;
    this.dni=dniscan;


    // this.guardardatosDeDueSup(datos);

      // this.formDueSup.get('nombreCtrl').setValue(nombre);
      // this.formDueSup.get('apellidoCtrl').setValue(apellido);
      // this.formDueSup.get('DNICtrl').setValue(dni);
  }

  scanCodepag() {
     this.barcodeScanner
       .scan()
       .then(barcodeData => {
         // alert("Barcode data " + JSON.stringify(barcodeData));
         this.scannedData = barcodeData;
         this.cargarDatosDesdeDni(this.scannedData);
       })
       .catch(err => {
         console.log("Error", err);
       });
   }

}
