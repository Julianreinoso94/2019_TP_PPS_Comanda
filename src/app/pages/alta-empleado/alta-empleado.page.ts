import { Component, OnInit,  ViewChild } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {EmpleadosService} from '../../services/empleados/empleados.service';
import { FotosService } from '../../services/fotos/fotos.service';
import { Router } from '@angular/router';
import {BarcodeScannerOptions,BarcodeScanner} from "@ionic-native/barcode-scanner/ngx";
import { ToastController } from '@ionic/angular';
import { ProfileService } from '../../services/user/profile.service';
import { Usuario } from './../../clases/usuario';
import { Observable } from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';
import { AuthService} from '../../services/user/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

import {Tab1Page} from '../../tab1/tab1.page'
import {ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-alta-empleado',
  templateUrl: './alta-empleado.page.html',
  styleUrls: ['./alta-empleado.page.scss'],
})

export class AltaEmpleadoPage implements OnInit {

  idiomaSeleccionado:any;
array:any=[];
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
 // loading = false;
  encodeData: any;
  scannedData: {};
  barcodeScannerOptions: BarcodeScannerOptions;


  unUsuario: Usuario;
  items: Observable<any[]>;
  foto: string;
  filename:string = "";

  constructor(
    private empleadosService: EmpleadosService,
    private router: Router,private route: ActivatedRoute, private tabpag:Tab1Page,
    private db: AngularFirestore,
    private camera: Camera, 
    private storage: AngularFireStorage, 
    private auth : AuthService,    
    private scanner: BarcodeScanner,
    private barcodeScanner: BarcodeScanner,
    public toastCtrl: ToastController) {

      this.barcodeScannerOptions = {
        showTorchButton: true,
        showFlipCameraButton: true
      }

      this.unUsuario = new Usuario();
      this.items = db.collection('Empleado').valueChanges();
    }

  ngOnInit() {

    this.idiomaSeleccionado = this.route.snapshot.paramMap.get('id');
      
    switch(this.idiomaSeleccionado) { 
      case 'en': { 
        this.array= this.tabpag.arrayINGLES;
       break; 
      } 
      case 'rus': { 
         this.array= this.tabpag.arrayRusia;

         break; 
      } 
      case 'por': { 
        this.array= this.tabpag.arrayPor;

        break; 
     } 
     case'fr':{
       this.array=this.tabpag.arrayFra;

       break
     }
     case'esp':{
      this.array=this.tabpag.arrayEs;

      break
    }

    case'de':{
      this.array=this.tabpag.arrayDe;
      break
    } 
      default: { 
        this.array= this.tabpag.arrayEs;

         break; 
      } 
   } 
    
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

  
 enviar()
 {
   console.log(this.unUsuario);
   var storage = firebase.storage();

   if(this.filename != undefined && this.filename != ""){

     storage.ref("FotosEmpleado/"+this.foto).getDownloadURL().then(url => {
       // alert(url);
       this.foto = url;
     });
   }

   if(this.unUsuario.nombre == null || this.unUsuario.apellido == null || this.unUsuario.dni == null || this.unUsuario.cuil == null ||
    this.unUsuario.perfil == null || this.unUsuario.email == null)
    {
      this.mostrarToast("Todos los campos son obligatorios", "color");
    }
    else{

      if(!this.ValidarNumero(this.unUsuario.dni))
      {
        this.mostrarToast("DNI no valido", "color");
      }
      else{

        if(!this.ValidarNumero(this.unUsuario.cuil))
        {
          this.mostrarToast("CUIL no valido", "color");
        }
        else
        {

   this.auth.registerEmpleado(this.unUsuario.email,"111111", this.unUsuario.dni, this.unUsuario.nombre, this.unUsuario.apellido, this.unUsuario.cuil, this.unUsuario.perfil, this.filename)
   .then((res) => {  
    console.log("Alta exitosa");
    this.mostrarToast("Se cargo el empleado con exito", "successToast");
    this.router.navigate(['login']);
     })
     .catch(function(error) {
       //alert("Error al guardar perfil")
       this.mostrarToast("Error al cargar empleado", "dangerToast");
       console.error("Error al escribir el usuario", error);
     });
    }
  }
}
 }


   //FOTO

   SacarFoto() {
    this.filename = Math.random().toString(36).substring(2);
    const options: CameraOptions = {
      quality: 50,
      targetHeight: 600,
      targetWidth: 600,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }

    this.camera.getPicture(options).then((imageData) => {
    // this.foto = "data:image/jpeg;base64," + imageData;
     this.foto='data:image/jpeg;base64,' + imageData;
     this.storage.ref('/FotosEmpleado/').child(this.filename).putString(this.foto, 'data_url', {contentType:'image/jpeg'});

            }, (err) => {
              //  // Handle error
         // alert("error " + JSON.stringify(err))
            });
       //  this.obtenerURL2();

   }



  ValidarNumero(numero: string) 
 {
   let arrayNumero = numero.split("");
   for (let caracter of arrayNumero) 
   {
     if (isNaN(parseInt(caracter))) 
     {
       return false;
      }
    }
    return true;
  }

/*
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
  */

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

   RemoveRecord(rowID) {
    this.empleadosService.EliminarEmpleado(rowID);
    this.mostrarToast("Se eliminó el empleado con exito", "color: Success");
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
