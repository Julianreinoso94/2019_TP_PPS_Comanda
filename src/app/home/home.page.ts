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
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  implements OnInit{
  public currentUser: firebase.User;
  uidUsuario:any;
  fechaconcatenada:any;
  horaselect: any;
  minutoselect: any;
  public fechaActual = formatDate(new Date(), 'yyyy/MM/dd', 'en');
  public horaActual = formatDate(new Date(), 'h:mm a', 'en');
  horayminutoconcatenadasIngreso: any;
  dateStart: String;
  hora = formatDate(new Date(), 'h:mm a', 'en');

    public userProfile: any;
    public birthDate: Date;
    public perfil:string;
    // public valor="hola";
    price: any = '';
    public mesas:any;
    primero: string;
    segundo: string;
    tercero: string;
    public split: string;
    listareservas : any;
    listadeespera : any;
    myDate: Date;

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
          mesa: e.payload.doc.data()['mesa'],
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
        case "juego":
          this.cargarqrJuegos(segundodato);
          break;
      case "Propina":
        alert("propina");
       let mesaClienteSentado;
        this.mesas.forEach(element => {////////////////////SI EL CLIENTE ESTA SENTADO EN ALGUNA MESA
          if (element.cliente == this.uidUsuario)
          { 
            mesaClienteSentado=element.id;
            
          }
          
        });
       

        if(segundodato == "cero")
        {

          alert(" propina cero");
          this.mesasService.Agregapropina(mesaClienteSentado,"cero")
        }
        if(segundodato == "diez")
        {
          this.mesasService.Agregapropina(mesaClienteSentado,"diez");
          
          alert(" propina diez");
        }
        if (segundodato == "cinco")
        {
          this.mesasService.Agregapropina(mesaClienteSentado,"cinco");
        }
        if(segundodato == "quince")
        {
          alert("propina quince");
          this.mesasService.Agregapropina(mesaClienteSentado,"quince")

        }
        if(segundodato=="veinte")
        {
          this.mesasService.Agregapropina(mesaClienteSentado,"veinte")

          alert("propina veinte");
        }


         break;
   
      default:
        confirm("Sorry, that color is not in the system yet!");
    }
  }

  mesa(codigo: string){
    //buscar mesa si esta libre 

    let codigo1="Os2GUPsKba7oNnKLXnAv"
let estado:string;
 let existe: any;
 let  pedidos : any;
  let estadomimesa;
  let estadoenlistadeespera: any;
 let codigomesa="BVtETGAAmETdzVTwFnUC"; //mesa2
let estasinreserva=true;
 let mesaClienteSentado="parado";
 let estaSentadoenEstaMesa=false;
 let usuarioreservacion=true;
let eselusuarioquereservo=false;
 let fechareserva;
let horareserva; 

this.listadeespera.forEach(element => { //LISTA DE ESPERA/////////////////////////
  if(element.cliente == this.uidUsuario)
  {
    estadoenlistadeespera=element.estado;
  }
   
 });

 
 this.mesas.forEach(element => {
  if (element.id ==  codigomesa)
  {
   estadomimesa= element.estado;
    
  }
  
});

this.mesas.forEach(element => {////////////////////SI EL CLIENTE ESTA SENTADO EN esta mesa
  if (element.id == codigomesa)
  { 
    if(element.cliente == this.uidUsuario)
    {
    estaSentadoenEstaMesa=true;
    }
  }
  
});
this.mesas.forEach(element => {////////////////////SI EL CLIENTE ESTA SENTADO EN ALGUNA MESA
  if (element.cliente == this.uidUsuario)
  { 
    mesaClienteSentado=element.id;
    
  }
  
});
 //////////////////////////////////LISTA DE RESERS//////////////////////////////////

 alert(this.uidUsuario);
 this.listareservas.forEach(element => {
   console.log("imprime element.usuario"+ element.usuario );
   console.log("imprime element.mesa"+ element.mesa );

  if( codigo == element.mesa )/////////////////////////////////////0 SI ESTA MESA ESTA RESERVADA
  {
    
    this.fechaconcatenada=element.fechareserva;
    this.horayminutoconcatenadasIngreso=element.horareserva;
    if( element.usuario ==this.uidUsuario)
    {
    eselusuarioquereservo=true;
    }

   // estadoenlistadeespera=element.estado;
  }
   
 });

 if(eselusuarioquereservo && estadomimesa == "Disponible")
 {
  this.mostrarToast("Se le ha asignado esta mesa Reservada .Ya puede sentarse..", "successToast");
  this.mesasService.AsignarClienteaMesa(codigo,this.uidUsuario,"Ocupada");
 //eliminar reserva
 }

 let numero =this.diferencia();
 alert("tiempo es:"+numero);
 //calcular los minutos
 if( numero<5 && !eselusuarioquereservo)
 {
  // usuarioreservacion=false;

  this.mostrarToast("Esta mesa esta Reservada", "successToast");
  this.router.navigateByUrl('home');

}
/////////////////////////////////////////////////////////////////////////////////////////////////////71111111
if(estadomimesa == "Disponible" &&  mesaClienteSentado=="parado" && estadoenlistadeespera=="asignandomesa" )
    {                                     //LA MESA ESTA DISPONIBLE
    // alert (estadomimesa);
   this.mesasService.AsignarClienteaMesa(codigo,this.uidUsuario,"Ocupada");
   this.mostrarToast("Se le ha asignado esta mesa.Ya puede sentarse..", "successToast");
   this.router.navigateByUrl('home');

    }
    else
    {
      this.mostrarToast("No se le puede asignar esta mesa por el momento", "successToast");

    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////2222
    if( estaSentadoenEstaMesa)
    {
      this.mostrarToast("Estado de sus Pedidos", "successToast");

      this.router.navigateByUrl('vericarmesapedido');

    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////333
    if (estadoenlistadeespera=="asignandomesa" && mesaClienteSentado != codigo)
    {
      // this.mostrarToast("No se le puede asignar esta mesa por el momento, usted esta sentado en otra mesa..", "successToast");

    }



 
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

    this.listadeespera.forEach(element => {//VALIDA QUE NO ESTE EN LISTA DE ESPERA
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
 ///////////////////////////NUEVO///////////////////////
      
   
    }

     
 cargarqrJuegos(tipojuego: string)
 {
   let postre=false;
   let descuento10=false;
   let bebida=false;
   let estasentado=false;
  this.mesas.forEach(element => {////////////////////SI EL CLIENTE ESTA SENTADO EN ALGUNA MESA
    if (element.cliente == this.uidUsuario)
    { 
      postre:element.descuentoPostre;
      descuento10=element.descuento10;
      bebida=element.bebida;
      estasentado=true;
      
    }
    
  });

  if(!estasentado)
  {
    this.mostrarToast("Para jugar debe estar sentado en una mesa", "successToast");

  }


  if( tipojuego == "bebidagratis" && estasentado)
  {
    if(!bebida)
    {
      this.router.navigateByUrl('juego-descuento');


    }
    else
    {

      this.mostrarToast("No puede participar nuevamente.Disculpe", "successToast");
      this.router.navigateByUrl('home');

    }
  }
  if(tipojuego =="postregratis" && estasentado)
  {
    if(!postre)
    {
      this.router.navigateByUrl('juego-postre');
      this.router.navigateByUrl('home');

    }
    else
    {
      this.mostrarToast("No puede participar nuevamente.Disculpe", "successToast");

    }

  }
  if(tipojuego =="diezdescuento" && estasentado)
  {
    if(!descuento10)
    {
      this.router.navigateByUrl('adivinar-numero');

    }
    else
    {
      this.mostrarToast("No puede participar nuevamente.Disculpe", "successToast");
      this.router.navigateByUrl('home');

    }
    
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
  

  diferencia():number {
    // this.horayminutoconcatenadasIngreso = this.horaselect + ":" + this.minutoselect;

    // this.dateStart = this.myDate.toString();
    // let toArray = this.dateStart.split("-");
    // this.primero = toArray[0] + "/";

    // this.segundo = toArray[1] + "/";
    // this.tercero = toArray[2];
    // this.split = this.primero.toString() + "/" + this.segundo.toString() + "/" + this.tercero.toString();

    // let toArray2 = this.dateStart.split("T");
    // let horatomada = toArray2.toString()
    // let horareserva = horatomada.split("-");
    // let horareservada = horareserva[0];
    // let horareservada1 = horareserva[1];
    // let horareservada2 = horareserva[2];
    // let diares = horareservada2.split(",");
    // let dt = diares[0].toString();


    // let horaa = this.hora.toString();
    // let horacortada = horaa.split(":");

    // let horacortada1 = horacortada[0];
    // let vy = horacortada1.toString().split("T");
    // let horacortada2 = horacortada[1];


    // this.fechaconcatenada = horareservada + "/" + horareservada1 + "/" + dt;

    var startTime = new Date(this.fechaconcatenada + " " + this.horayminutoconcatenadasIngreso
    );

    //EN HTML APARECE AÑO MES DIA
    var endTime = new Date(this.fechaActual + " " + this.horaActual);
    var difference = endTime.getTime() - startTime.getTime(); // This will give difference in milliseconds
    var resultInMinutes = Math.round(difference / 60000);
    alert("resultado:" + resultInMinutes);

    // setTimeout(() => this.spinner = false, 3000);

    // this.mostrarToast("Su reserva fue guardada con exito.");
   return resultInMinutes;
  }//////////////////////////////////////////////////FIN METODO DIFERENCIA
 
}
