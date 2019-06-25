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

@Component({
  selector: 'app-reserva-cliente',
  templateUrl: './reserva-cliente.page.html',
  styleUrls: ['./reserva-cliente.page.scss'],
})
export class ReservaClientePage implements OnInit {
 dia:any;
 horario:any;
 empleados: any;
 public comidaActual: any = {};
 public mesaActual: any = {};

 

 loading = false;
 pedidos : any;
 cantidad = 1;
 mesas : any;

 public comidasList: Array<any>;
 codigoProducto:string;
 codigoMesa:any;

//nuevo////////////////////////////////////////////////////////////


public eventSource = [];
public selectedDate = new Date();
isToday: boolean = true;
markDisabled = (date: Date) => {
  var d = new Date();
  // d.setDate(d.getDate() - 1);
  return date < d;
};
calendar = {
  mode: 'month',
  currentDate: this.selectedDate
}


fechaElegida = {
  dia: '',
  mes: '',
  hora: '',
  minuto: ''
}

hora: any;
clienteEnEspera: any;
reservaRealizada: any = null;

// listaEsperaClientes: any[];
key: any;
// PickerOptions: any;
mesaSeleccionada: any;
// cantPersonas: any;
spinner:boolean ; 
tienereserva: boolean = false;


  ngOnInit() {
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

  constructor(private comidaService: ComidasService,
    private router: Router,  private empleadosService: EmpleadosService,
    private mesasService: MesasService,
    // private camara: Camera,
      public toastCtrl: ToastController,

    private pedidosService: PedidosService,
    public calendario: Calendar

  ) {

    this.eventSource = this.createEvents();  


   }

   changeMode(mode) {
    this.calendar.mode = mode;
  }
  // loadEvents() {
  //   this.eventSource = this.createRandomEvents();
  // }
  onCurrentDateChanged(ev) {
    // console.log(ev);
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    ev.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === ev.getTime();
  
  }

  onTimeSelected(event) {
    // console.log(event);
    var date = new Date().getTime();

    let fechaElegida = JSON.stringify(event.selectedTime);
    fechaElegida = fechaElegida.substr(1,fechaElegida.length-1);
    let splitFecha = fechaElegida.split('-');
    this.fechaElegida.dia = splitFecha[2].split('T')[0];
    this.fechaElegida.mes = splitFecha[1];

  }

  
  guardar(){

    //VARIABLES
    // localStorage.setItem("tienereserva","false");
    let horaminutoseg = this.hora.substr(11,this.hora.length-21);
    // console.log(this.hora);
    let splitHoraMinSeg= horaminutoseg.split(':');
    this.fechaElegida.hora = splitHoraMinSeg[0];
    this.fechaElegida.minuto = splitHoraMinSeg[1];
    // let usuarioLogueado: any = JSON.parse(sessionStorage.getItem('usuario'));

    //TABLA RESERVAMESAS
    this.guardarReservas();

   


    localStorage.setItem("dia",this.fechaElegida.dia);
    localStorage.setItem("mes",this.fechaElegida.mes);
    localStorage.setItem("hora",this.fechaElegida.hora);
    localStorage.setItem("minuto",this.fechaElegida.minuto);
  
    localStorage.setItem("reservaStatus","si");
  
  
    this.spinner = true;
    this.eventSource = this.createEvents(); 
    
    setTimeout(() => this.spinner = false , 3000);
  
     this.muestroToast("Su reserva fue guardada con exito.");
  
  }

  guardarReservas(){

    let usuarioLogueado: any = JSON.parse(sessionStorage.getItem('usuario'));
  /*  this.baseService.getItems('reservademesas').then(lista => {
    this.reservaRealizada = lista.find(cliente => cliente.correo == usuarioLogueado.correo);
    let objetoEnviar = {
      "correo": usuarioLogueado.correo,
      "fechaElegida": this.fechaElegida,
      "mesaSeleccionada": this.mesaSeleccionada,
      "estadoConfirmacion": "pendiente"
    }
    if(this.reservaRealizada == undefined)
    {
      this.baseService.addItem('reservademesas', objetoEnviar);  

    }
    else{
      this.baseService.updateItem('reservademesas', this.reservaRealizada.key, objetoEnviar);  

    }
  
    });*/

}
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

createEvents(){

  var events = [];

 
  let usuarioLogueado: any = JSON.parse(sessionStorage.getItem('usuario'));
/* this.baseService.getItems('reservademesas').then(lista => {
    this.reservaRealizada = lista.find(cliente => cliente.correo == usuarioLogueado.correo);
    
    if(this.reservaRealizada == undefined)
    {
      
      localStorage.setItem("reservaStatus","no");


    }
    else{
      localStorage.setItem("dia",this.reservaRealizada.fechaElegida.dia);
      localStorage.setItem("mes",this.reservaRealizada.fechaElegida.mes);
      localStorage.setItem("hora",this.reservaRealizada.fechaElegida.hora);
      localStorage.setItem("minuto",this.reservaRealizada.fechaElegida.minuto);
      localStorage.setItem("estadoConfirmacion",this.reservaRealizada.estadoConfirmacion);
      // console.log(localStorage.getItem("estadoConfirmacion"));
      localStorage.setItem("reservaStatus","si");

    }
   
 
  });*/
  
  var startDay = parseInt(localStorage.getItem("dia"));
  var endDay = parseInt(localStorage.getItem("dia")) ;
  var startMinute = parseInt(localStorage.getItem("minuto"));
  var startHora = parseInt(localStorage.getItem("hora"));
  var startMes = parseInt(localStorage.getItem("mes"));
  var startStatus = localStorage.getItem("reservaStatus");
  var confirmadaStatus = localStorage.getItem("estadoConfirmacion");

  var startTime;
  var endTime;
 
  var endMinute = Math.floor(120) + startMinute;

    for (var i = 0; i < 1; i += 1) {
      
        // if (eventType === 0) {
          
        // } else {

        if(startStatus == "si")
        {
          // console.log(startStatus);
          startTime = new Date(2019, startMes-1, startDay, startHora, startMinute);
          endTime = new Date(2019, startMes-1, endDay,startHora, endMinute);

          // console.log(startTime);
          // console.log(endTime);

          events.push({
              title: 'Estado Reserva: '+ confirmadaStatus,
              // notes: 'notas',
              startTime: startTime,
              endTime: endTime,
              allDay: false
          });


        }
            
        // }
    }
    return events;

}
////////////////////////////////////////////////////////////////

   

   hacerReserva(
    // codigoPedido: number,
     codigoMesa: number,
 
   ): void {
  alert ("Entro a hacer reserva");
  alert(codigoMesa);
     
     this.loading = true;
  
 
 
       this.mesasService.ModificarEstadoDeunaMesa(codigoMesa,"Pendiente");
       alert("actualizomeza");
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
