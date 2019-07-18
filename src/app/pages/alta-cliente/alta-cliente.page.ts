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


  constructor(private db: AngularFirestore, private camera: Camera, private storage: AngularFireStorage, private auth : AuthService,  private router : Router) 
  {
    this.unUsuario = new Usuario();
    this.items = db.collection('cliente').valueChanges();
  }

  ngOnInit() {
  }


  /*
    register(email : string, password : string, name : string){

    return new Promise ((resolve, reject) => {
      this.AFauth.auth.createUserWithEmailAndPassword(email, password).then( res =>{
          // console.log(res.user.uid);
        const uid = res.user.uid;
          this.db.collection('users').doc(uid).set({
            name : name,
            uid : uid
          })
        
        resolve(res)
      }).catch( err => reject(err))
    })
  */

  enviar()
  {
    console.log(this.unUsuario);
    var storage = firebase.storage();

    if(this.filename != undefined && this.filename != ""){

      storage.ref("FotosCliente/"+this.foto).getDownloadURL().then(url => {
        // alert(url);
        this.foto = url;
      });
    }

    this.auth.register(this.unUsuario.email,this.unUsuario.clave, this.unUsuario.dni, this.unUsuario.nombre, this.unUsuario.apellido, this.filename)
    .then((res) => {  
     console.log("Alta exitosa");
     this.router.navigate(['login']);
      })
      .catch(function(error) {
        alert("Error al guardar perfil")
        console.error("Error al escribir el usuario", error);
      });
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
     this.storage.ref('/FotosCliente/').child(this.filename).putString(this.foto, 'data_url', {contentType:'image/jpeg'});

            }, (err) => {
              //  // Handle error
         // alert("error " + JSON.stringify(err))
            });
       //  this.obtenerURL2();

   }

  
}
