import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { CrudService } from '../../services/crud.service';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase/app';
import { AlertController } from '@ionic/angular';
import { Router } from "@angular/router";
import {AuthService} from "../../services/user/auth.service";
import {BarcodeScannerOptions,BarcodeScanner} from "@ionic-native/barcode-scanner/ngx";
//import { FCM } from '@ionic-native/fcm/ngx';//AGREGADO PUSH NOTIF
import {EmpleadosService} from '../../services/empleados/empleados.service';


import { ProfileService } from '../../services/user/profile.service';

@Component({
  selector: 'app-alta-duenio',
  templateUrl: './alta-duenio.page.html',
  styleUrls: ['./alta-duenio.page.scss'],
})
export class AltaDuenioPage implements OnInit {
  students: any;
   nombre: string;
   apellido: string;
   dni: any;
   cuil:string;
   foto:string;
   perfil:string;
   filename:string;
   codigoUid:string="";

   datosEscaneados: any;
   datos: any;
   loading = false;

   //////////////
   encodeData: any;
 scannedData: {};
 barcodeScannerOptions: BarcodeScannerOptions;
 //////////



   constructor(    private scanner: BarcodeScanner,private barcodeScanner: BarcodeScanner,
       private profileService: ProfileService,
private crudService: CrudService,private storage: AngularFireStorage,private camera: Camera,	private alertController: AlertController,private user:AuthService)
//,private fcm: FCM)
{
  //Options
   this.barcodeScannerOptions = {
     showTorchButton: true,
     showFlipCameraButton: true
 }
}

   ngOnInit() {
     this.crudService.read_Students().subscribe(data => {

       this.students = data.map(e => {
         return {
           id: e.payload.doc.id,
           isEdit: false,
           nombre: e.payload.doc.data()['nombre'],
           apellido: e.payload.doc.data()['apellido'],
           dni: e.payload.doc.data()['dni'],
           cuil: e.payload.doc.data()['cuil'],
           foto: e.payload.doc.data()['foto'],
           perfil: e.payload.doc.data()['perfil'],

         };
       })
       console.log(this.students);

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


     this.crudService.create_NewStudent(record).then(resp => {
       this.nombre = "";
       this.apellido = undefined;
       this.dni = "";
       this.cuil = "";
       this.foto = "";
       this.perfil = "";
       this.codigoUid=""
       console.log(resp);
     })
       .catch(error => {
         console.log(error);
       });
   }

   RemoveRecord(rowID) {
     this.crudService.delete_Student(rowID);
   }

   EditRecord(record) {
     record.isEdit = true;
     record.EditName = record.nombre;
     record.EditAge = record.apellido;
     record.EditAddress = record.perfil;
   }

   UpdateRecord(recordRow) {
     let record = {};
     record['nombre'] = recordRow.EditName;
     record['apellido'] = recordRow.EditAge;
     record['dni'] = recordRow.EditAddress;
     record['cuil'] = recordRow.EditAddress;
     record['nombre'] = recordRow.EditAddress;
     record['perfil'] = recordRow.EditAddress;
     this.crudService.update_Student(recordRow.id, record);
     recordRow.isEdit = false;
   }

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
        this.storage.ref('/FotosSupervisor/').child(this.filename).putString(this.foto, 'data_url', {contentType:'image/jpeg'});

               }, (err) => {
                 //  // Handle error
            // alert("error " + JSON.stringify(err))
               });
          //  this.obtenerURL2();

      }

      Subir()
         {

           //this.urlwpa="";
           var source = "";
           var storage = firebase.storage();

           let record = {};
           record['nombre'] = this.nombre;
           record['apellido'] = this.apellido;
           record['dni'] = this.dni;
           record['cuil'] = this.cuil;
           record['foto'] ="";
           record['perfil'] = this.perfil;

           if(this.filename != undefined){

            storage.ref("FotosSupervisor/"+this.filename).getDownloadURL().then(url => {
              // alert(url);
              record['foto'] =url;
            });
          }

            this.crudService.create_NewStudent(record).then(resp => {
              this.nombre = "";
              this.apellido = undefined;
              this.dni = "";
              this.cuil = "";
              this.foto = "";
              this.perfil = "";
              this.codigoUid="";
              console.log(resp);
            })
              .catch(error => {
                console.log(error);
              });
        }//fin metodo

        Volver()
        {
      /*+

          this.clientes.forEach(element => {
            this.codigo=element.codigo;

         });

         alert(this.codigo);
         */


        let record = {};
        record['nombre'] = "";
        record['LastName']="";
        record['clienteDni']="";
        record['foto']="";
        record['perfil']="Cliente";
           this.signupUser(record);

        }

        async signupUser(record): Promise<void> {
          /*


          this.authService.signupUserCliente( this.clienteName+"@gmail.com", "123456","Cliente",record,this.codigo).then(
            () => {
              this.loading.dismiss().then(() => {
                this.router.navigateByUrl('home');
              });
            },
            error => {
              this.loading.dismiss().then(async () => {
                const alert = await this.alertCtrl.create({
                  message: error.message,
                  buttons: [{ text: 'Ok', role: 'cancel' }],
                });
                await alert.present();
              });
            }
          );
          this.loading = await this.loadingCtrl.create();
         // await this.loading.present();
         */
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

 updateperfil(){
  // alert("actualizndo");
     this.profileService.updateperfil("Supervisor");
 }


 }
