import { Component, OnInit  } from '@angular/core';
import { ProfileService } from './../services/user/profile.service';
import {AuthService} from "./../services/user/auth.service";
import { AlertController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservasService } from '../services/reservas/reservas.service';
import { MesasService } from '../services/mesas/mesas.service';
import {BarcodeScannerOptions,BarcodeScanner} from "@ionic-native/barcode-scanner/ngx";
import { AngularFireStorage } from '@angular/fire/storage';
import { Alert } from 'selenium-webdriver';


import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { EventService } from '../services/event/event.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  implements OnInit{
  public currentUser: firebase.User;
  uidUsuario:any;

    public userProfile: any;
    public birthDate: Date;
    public perfil:string;
    // public valor="hola";
    price: any = '';
    public mesas:any;

    listareservas : any;
    listadeespera : any;

    datosEscaneados: any;
    datos: any;
    loading = false;
 
    //////////////
    encodeData: any;
  scannedData: {};
  barcodeScannerOptions: BarcodeScannerOptions;
  //////////
 
    ionViewWillEnter(){
////////////////////////////////////////MI USUARIO
      this.profileService
      .getUserProfile()
      .get()
      .then( userProfileSnapshot => {
        this.userProfile = userProfileSnapshot.data();
        // console.log(this.userProfile);
        this.birthDate = userProfileSnapshot.data().birthDate;
        this.perfil= userProfileSnapshot.data().perfil;
      });
    //  console.log(this.userProfile.perfil);
///////////////////////////////////////////////////LISTA DE ESPERA
this.serviciolistadeespera.getListaEspera().subscribe(data => {

  this.listadeespera = data.map(e => {
    return {
      id: e.payload.doc.id,
     // isEdit: false,
      estado: e.payload.doc.data()['estado'],
      cliente: e.payload.doc.data()['uid'],
    //  fechareserva: e.payload.doc.data()['fechareserva'],
      // cantPersonas: e.payload.doc.data()['cantPersonas'],
      // cliente: e.payload.doc.data()['cliente'],
      // monto: e.payload.doc.data()['monto'],
      // propina: e.payload.doc.data()['propina'],
      // descuento10: e.payload.doc.data()['descuento10'],
      // descuentoBebida: e.payload.doc.data()['descuentoBebida'],
      // descuentoPostre: e.payload.doc.data()['descuentoPostre'],
      // estadobool:false,
      };
  })
  console.log(this.listadeespera);
});
    //////////////////////////////////////////RESERVAS
    this.resevas.TraerReservas().subscribe(data => {

      this.listareservas = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          usuario: e.payload.doc.data()['usuario'],
          horareserva: e.payload.doc.data()['horareserva'],
          fechareserva: e.payload.doc.data()['fechareserva'],
          // cantPersonas: e.payload.doc.data()['cantPersonas'],
          // cliente: e.payload.doc.data()['cliente'],
          // monto: e.payload.doc.data()['monto'],
          // propina: e.payload.doc.data()['propina'],
          // descuento10: e.payload.doc.data()['descuento10'],
          // descuentoBebida: e.payload.doc.data()['descuentoBebida'],
          // descuentoPostre: e.payload.doc.data()['descuentoPostre'],
          // estadobool:false,
          };
      })
      console.log(this.listareservas);
    });
    /////////////////////////////////////////////////MESAS
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
    constructor(private resevas:ReservasService,private mesasService: MesasService,private storage: AngularFireStorage,
      private alertCtrl: AlertController,private route: ActivatedRoute, private serviciolistadeespera: EventService,
      private authService: AuthService,   private scanner: BarcodeScanner,private barcodeScanner: BarcodeScanner,
      private profileService: ProfileService,     private router: Router,
      public toastCtrl: ToastController


    ) {
      firebase.auth().onAuthStateChanged(user => {
 
        this.currentUser = user;
        this.uidUsuario = user.uid});
      
      this.price = this.route.snapshot.params['price'];

    }
  ngOnInit() {


  }


  scanCodepag() {
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        // alert("Barcode data " + JSON.stringify(barcodeData));
        this.scannedData = barcodeData;
        this.cargarDatosqr(this.scannedData);
      })
      .catch(err => {
        console.log("Error", err);
      });
  }
 
 
  cargarDatosqr(datos: any) {
    // alert(datos);
    let parsedData = datos.text.split('@');
    let nombrescan = parsedData[0].toString();
    let segundodato = parsedData[1].toString();
  //  let dniscan: number = +parsedData[2];
    // this.nombre=nombrescan;
    // this.apellido=apellido;
    // this.dni=dniscan;
    switch (nombrescan) {
      case "Mesa":
     alert("Mesa");
   this.mesa(segundodato);

      break;
      case "ListaDeEspera":
          alert("Lista de espera");

        this.listaespera();
        break;
      case "Propina":
        alert("propina");

        if(segundodato == "cero")
        {
          alert(" propina cero");
        }
        if(segundodato == "diez")
        {
          alert(" propina diez");
        }
        if (segundodato == "cinco")
        {
          alert(" propina cinco");
        }
        if(segundodato == "quince")
        {
          alert("propina quince")
        }
        if(segundodato=="veinte")
        {
          alert("propina veinte");
        }


         break;
   
      default:
        confirm("Sorry, that color is not in the system yet!");
    }
  }

  mesa(codigo: string){
    //buscar mesa si esta libre 
let estado:string;
 let existe: any;
 let  pedidos : any;
  let estadomimesa;
  let estadoenlistadeespera: any;
 let codigomesa="BVtETGAAmETdzVTwFnUC"; //mesa2
let estasinreserva=true;
 let mesaClienteSentado="parado";
 alert(this.uidUsuario);

 //////////////////////////////////LISTA DE RESERS
 this.listareservas.forEach(element => {
  if(element.usuario == this.uidUsuario && element.estado == "aprobada")
  {



    estadoenlistadeespera=element.estado;
  }
   
 });

 this.listadeespera.forEach(element => { //LISTA DE ESPERA/////////////////////////
  if(element.cliente == this.uidUsuario)
  {
    estadoenlistadeespera=element.estado;
  }
   
 });


    /////////////////////VERIFICA ESTADO DE LA MESA 
    this.mesas.forEach(element => {
      if (element.id ==  codigomesa)
      {
       estadomimesa= element.estado;
        
      }
      
    });
    this.mesas.forEach(element => {////////////////////SI EL CLIENTE ESTA SENTADO EN ALGUNA MESA
      if (element.cliente == this.uidUsuario)
      { 
        mesaClienteSentado=element.id;
        
      }
      
    });

    if(estadomimesa == "Disponible")
    {                                     //LA MESA ESTA DISPONIBLE
    alert (estadomimesa);
    }
    else
    {
      this.mostrarToast("La mesa esta ocupada,intente luego..", "successToast");

    }

     if( estadoenlistadeespera =="asignandomesa")
     {    
                      if (mesaClienteSentado== "parado")// SI ES PARADO QUIERE DECIR QUE PUEDE TOMAR ESA MESA
                      {
                          alert("tomar mesa");
                      }
                      else
                      { 
                        if (mesaClienteSentado == codigomesa)
                        {
                          this.router.navigateByUrl('home');

                            alert("estado de pedidos");

                        }
                        else
                        {
                          this.mostrarToast("usted ya esta sentado en otra mesa,Escanee el codigo de su mesa..", "successToast");

                        }
                      }//END IF (mesaClienteSentado== "parado")
      }
    else
    {
      this.mostrarToast("Usted primero debe pasar por la lista de espera ", "successToast");

    }
    console.log( mesaClienteSentado);

 
    }//FIN QR MESA ///////////////////////////////////////////////////////////////////////////////


    listaespera(){
   let elclientenoestaenlistadeespera=true;
  let mesaClienteSentado=true;
   this.mesas.forEach(element => {////////////////////SI EL CLIENTE ESTA SENTADO EN ALGUNA MESA
    if (element.cliente == this.uidUsuario)
    { 
      mesaClienteSentado=false;
      
    }
    
  });

    this.listadeespera.forEach(element => {
       if(element.cliente == this.uidUsuario)
       {
        elclientenoestaenlistadeespera=false;
       }
        
      });

      if(elclientenoestaenlistadeespera && mesaClienteSentado)//no tiene que estar sentado en una mesa y tampoco aparecer en la listadeespera
      {
        this.serviciolistadeespera.guardarListaEspera();
      }
      else{
        this.mostrarToast("Usted no puede ingresar a la lista de espera ", "successToast");

      }
 
       
   
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
