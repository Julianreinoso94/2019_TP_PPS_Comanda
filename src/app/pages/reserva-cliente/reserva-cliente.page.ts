import { PedidosService } from 'src/app/services/pedidos.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MesasService } from '../../services/mesas/mesas.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FotosService } from '../../services/fotos/fotos.service';
import { EmpleadosService } from 'src/app/services/empleados/empleados.service';
import { ToastController } from '@ionic/angular';
import { isBoolean } from 'util';
import { ComidasService } from 'src/app/services/comidas/comidas.service';
import { Calendar } from "@ionic-native/calendar/ngx";
import { DatetimeOptions } from '@ionic/core';
import { formatDate } from '@angular/common';


import * as esLocale from 'date-fns/locale/es/index.js';
import { DateFnsModule } from 'ngx-date-fns';
import { ProfileService } from 'src/app/services/user/profile.service';
import { ReservasService } from 'src/app/services/reservas/reservas.service';



import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Component({
  selector: 'app-reserva-cliente',
  templateUrl: './reserva-cliente.page.html',
  styleUrls: ['./reserva-cliente.page.scss'],
})
export class ReservaClientePage implements OnInit {

  cantPersonas:string;
  primero: string;
  segundo: string;
  tercero: string;
  public split: string;
  horario: any;
  empleados: any;
  public comidaActual: any = {};
  public mesaActual: any = {};
  //ESTAS DOS VARIABLES SON LA QUE TOMA PARA LA FECHA DE HOY
  public fechaActual = formatDate(new Date(), 'yyyy/MM/dd', 'en');
  public horaActual = formatDate(new Date(), 'h:mm a', 'en');
  public horareserva = ['08', '09', '10', '11', '12', '13', '14', '15', '16', '20', '21', '22'];
  public minutoreserva = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16",
    "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32",
    "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48",
    "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"];
  horaselect: any;
  minutoselect: any;
  horayminutoconcatenadasIngreso: any;
  loading = false;
  pedidos: any;
  cantidad = 1;
  mesas: any;
  public comidasList: Array<any>;
  codigoProducto: string;
  codigoMesa: any;
  key: any;
  mesaSeleccionada: any;
  spinner: boolean;
  tienereserva: boolean = false;

  public userProfile: any;
  public birthDate: Date;
  public perfil:string;
  // public valor="hola";
  price: any = '';
  uidUsuario:any;


  //nuevo////////////////////////////////////////////////////////////


  public selectedDate = new Date();
  isToday: boolean = true;

  hora = formatDate(new Date(), 'h:mm a', 'en');
  myDate: Date;
  HoraParse: String;
  //hora: DatetimeOptions;
  clienteEnEspera: any;
  reservaRealizada: any = null;
  dateStart: String;
  fechaconcatenada:any;
  today: Date;
  Christmas: Date;

  result: number;
  public currentUser: firebase.User;

  constructor(private comidaService: ComidasService,
    private dfns: DateFnsModule,
    private router: Router,
    private empleadosService: EmpleadosService,
    private mesasService: MesasService,
    public toastCtrl: ToastController,
    private pedidosService: PedidosService,
    public calendario: Calendar,
    public profileService: ProfileService,
    public reserva: ReservasService

  ) {

    firebase.auth().onAuthStateChanged(user => {
 
        this.currentUser = user;
        this.uidUsuario = user.uid});
  }

  ngOnInit() {
    // this.profileService
    // .getUserProfile()
    // .get()
    // .then( userProfileSnapshot => {
    //   this.uidUsuario= userProfileSnapshot.id,

    //   this.userProfile = userProfileSnapshot.data();
    //   // console.log(this.userProfile);
    //   this.birthDate = userProfileSnapshot.data().birthDate;
    //   this.perfil= userProfileSnapshot.data().perfil;
    // });
  //  console.log(this.userProfile.perfil);
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
        };
      })
      console.log(this.mesas);
    });

  }


  diferencia() {
    this.horayminutoconcatenadasIngreso = this.horaselect + ":" + this.minutoselect;

    this.dateStart = this.myDate.toString();
    let toArray = this.dateStart.split("-");
    this.primero = toArray[0] + "/";

    this.segundo = toArray[1] + "/";
    this.tercero = toArray[2];
    this.split = this.primero.toString() + "/" + this.segundo.toString() + "/" + this.tercero.toString();

    let toArray2 = this.dateStart.split("T");
    let horatomada = toArray2.toString()
    let horareserva = horatomada.split("-");
    let horareservada = horareserva[0];
    let horareservada1 = horareserva[1];
    let horareservada2 = horareserva[2];
    let diares = horareservada2.split(",");
    let dt = diares[0].toString();


    let horaa = this.hora.toString();
    let horacortada = horaa.split(":");

    let horacortada1 = horacortada[0];
    let vy = horacortada1.toString().split("T");
    let horacortada2 = horacortada[1];


    this.fechaconcatenada = horareservada + "/" + horareservada1 + "/" + dt;

    var startTime = new Date(this.fechaconcatenada + " " + this.horayminutoconcatenadasIngreso
    );

    //EN HTML APARECE AÑO MES DIA
    var endTime = new Date(this.fechaActual + " " + this.horaActual);
    var difference = endTime.getTime() - startTime.getTime(); // This will give difference in milliseconds
    var resultInMinutes = Math.round(difference / 60000);
    alert("resultado:" + resultInMinutes);

    setTimeout(() => this.spinner = false, 3000);

    this.muestroToast("Su reserva fue guardada con exito.");

  }//////////////////////////////////////////////////FIN METODO DIFERENCIA



  async muestroToast(mensaje: string) {
    const toast = await this.toastCtrl.create({

      message: mensaje,
      color: 'success',
      showCloseButton: true,
      position: 'top',
      closeButtonText: 'OK',
      // duration: 3000
    });

    toast.present();
  }


  ////////////////////////////////////////////////////////////////

  // id: id,
  // fechareserva: fechareserva,
  // horareserva: horareserva,
  // usuario: usuario

  hacerReserva(
    // codigoPedido: number,
    codigoMesa: number,

  ): void {
    // alert("Entro a hacer reserva");
    // alert(codigoMesa);

    this.loading = true;


this.reserva.crearReserva(this.uidUsuario,this.fechaconcatenada, this.horayminutoconcatenadasIngreso,this.cantPersonas)
   // this.mesasService.ModificarEstadoDeunaMesa(codigoMesa, "Pendiente");
    //alert("actualizomeza");
    this.spinner = true;
    this.router.navigateByUrl('/home');

  }






}
