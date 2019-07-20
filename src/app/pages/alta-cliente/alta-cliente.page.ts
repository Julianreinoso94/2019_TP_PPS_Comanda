import { Component, OnInit } from '@angular/core';
import { NavController,ToastController } from '@ionic/angular';
//import { AngularFireAuth } from "angularfire2/auth";
//import firebase from "firebase";
//import { Camera, CameraOptions } from '@ionic-native/camera';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import {BarcodeScannerOptions,BarcodeScanner} from "@ionic-native/barcode-scanner/ngx";
//import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AlertController } from '@ionic/angular';
import { Usuario } from './../../clases/usuario';
import { Observable } from 'rxjs';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import { AuthService} from '../../services/user/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
//para poder hacer las validaciones
import { Validators, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ClienteService} from '../../services/clientes/cliente.service';


@Component({
  selector: 'app-alta-cliente',
  templateUrl: './alta-cliente.page.html',
  styleUrls: ['./alta-cliente.page.scss'],
})
export class AltaClientePage implements OnInit {

  unUsuario: Usuario;
  items: Observable<any[]>;
  foto: string;
  filename:string = "";
  clientes: any;


  constructor(
    private db: AngularFirestore, 
    private camera: Camera, 
    private storage: AngularFireStorage, 
    private auth : AuthService,  
    private router : Router,
    private clienteService: ClienteService,
    public toastCtrl: ToastController) 
  {
    this.unUsuario = new Usuario();
    this.items = db.collection('cliente').valueChanges();
  }

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


  enviar()
  {
    console.log(this.unUsuario);
    var storage = firebase.storage();

    if(this.filename != undefined && this.filename != ""){

      storage.ref("FotosAnonimo/"+this.foto).getDownloadURL().then(url => {
        // alert(url);
        this.foto = url;
      });
    }

    if(this.unUsuario.nombre == null || this.unUsuario.apellido == null || this.unUsuario.dni == null || 
       this.unUsuario.email == null || this.unUsuario.clave == null)
      {
        this.mostrarToast("Todos los campos son obligatorios", "color");
      }
      else{
  
  
     if(!this.ValidarNumero(this.unUsuario.dni))
     {
       this.mostrarToast("DNI no valido", "color");
     }
     
      else
      {
        if(this.unUsuario.clave.length < 6)
       {
        this.mostrarToast("Clave debe ser mayor a 6 caracteres", "color");
       }
       else{
  

    this.auth.register(this.unUsuario.email,this.unUsuario.clave, this.unUsuario.dni, this.unUsuario.nombre, this.unUsuario.apellido, this.filename)
    .then((res) => {  
     console.log("Alta exitosa");
     this.mostrarToast("Alta Exitosa", "color");
     this.router.navigate(['login']);
      })
      .catch(function(error) {
        this.mostrarToast("Error al escribir el usuario", "color");
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
     this.storage.ref('/FotosAnonimo/').child(this.filename).putString(this.foto, 'data_url', {contentType:'image/jpeg'});

            }, (err) => {
              //  // Handle error
         // alert("error " + JSON.stringify(err))
            });
       //  this.obtenerURL2();

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

  
}
