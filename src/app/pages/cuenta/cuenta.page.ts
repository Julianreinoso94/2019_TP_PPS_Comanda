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
import {BarcodeScannerOptions,BarcodeScanner} from "@ionic-native/barcode-scanner/ngx";



import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { EventService } from '../../services/event/event.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements  OnInit {
  datosEscaneados: any;
    datos: any;
    loading = false;
 
    //////////////
    encodeData: any;
  scannedData: {};
  barcodeScannerOptions: BarcodeScannerOptions;

  public currentUser: firebase.User;
  uidUsuario:any;
  mimesa:any;

  empleados: any;
  public comidaActual: any = {};
  public mesaActual: any = {};
  public preciounabebida=0;
  public preciounpostre=0;
  public preciocondescuento10;
  public propinadada;

  

  //loading = false;
  pedidos : any;
  cantidad = 1;
  mesas : any;
  precioUnitario=0;
  public comidasList: Array<any>;
  codigoProducto:string;
  codigoMesa:any;
  ActualizarmontoTotalmesa:number;
  preciototalpedido:number;
  montoTotal:number;
   a:String;
   valorpropina;
   pagarpropina=0;
   

  constructor(private comidaService: ComidasService, private scanner: BarcodeScanner,private barcodeScanner: BarcodeScanner,
    private router: Router,  private empleadosService: EmpleadosService,
    private mesasService: MesasService,
    // private camara: Camera,
    public fotoService: FotosService,
    public toastCtrl: ToastController,
    private pedidosService: PedidosService
  ) {
    firebase.auth().onAuthStateChanged(user => {
 
      this.currentUser = user;
      this.uidUsuario = user.uid});

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
            valorpropina: e.payload.doc.data()['propina'],
            descuento10: e.payload.doc.data()['descuento10'],
            descuentoBebida: e.payload.doc.data()['descuentoBebida'],
            descuentoPostre: e.payload.doc.data()['descuentoPostre'],
          };
        })
        console.log(this.mesas);
      });
      this.pedidosService.TraerPedidosPorMesa(this.codigoMesa).subscribe(data => {
  
        this.pedidos = data.map(e => {
          return {
            id: e.payload.doc.id,
            isEdit: false,
            codigoPedido: e.payload.doc.data()['codigoPedido'],
            codigoProducto: e.payload.doc.data()['codigoProducto'],
            codigoMesa: e.payload.doc.data()['codigoMesa'],
            detallePedido: e.payload.doc.data()['detallePedido'],
            estadoPedido: e.payload.doc.data()['estadoPedido'],
            tipoPedido: e.payload.doc.data()['tipoPedido'],
            cantidad: e.payload.doc.data()['cantidad'],
            monto: e.payload.doc.data()['monto'],
            idMozo: e.payload.doc.data()['idEmpleado']
          };
        })
        console.log(this.pedidos);
      });
  
    
 
   }


   ngOnInit() {
   

          

  }

  
  ionViewWillEnter(){

    
    //  alert(this.uidUsuario);
    //trae todas la lista comidas
    this.comidaService
    .getComidasList().orderBy('name', 'asc')
    .get()
    .then(comidasListSnapshot => {
      this.comidasList = [];
      comidasListSnapshot.forEach(snap => {
        this.comidasList.push({
          id: snap.id,
          name: snap.data().name,
          description: snap.data().description,
          price: snap.data().price,
          time: snap.data().time,
        });
        // return false;
      });
    });

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

    this.mesas.forEach(element => {//TRAE MESA DEL USUARIO
      if(element.cliente == this.uidUsuario)
      {
        this.mimesa = element.id
      }
      
    });
    // alert(this.mimesa);
    this.mesas.forEach(element => {
      if(element.id ==this.mimesa)
      {
        this.montoTotal=element.monto;
        this.valorpropina=element.propina;
        // alert(this.valorpropina);

      }
    });

// alert(this.valorpropina);
    // this.pagarpropina=    this.propina(this.valorpropina)


    
    // alert(this.montoTotal)

   }
   

  montoMesa()
  {
   this.pedidosService.TraerPedidosPorMesa(this.mimesa).subscribe(data => {

     this.pedidos = data.map(e => {
       return {
         id: e.payload.doc.id,
         isEdit: false,
         codigoPedido: e.payload.doc.data()['codigoPedido'],
         codigoProducto: e.payload.doc.data()['codigoProducto'],
         codigoMesa: e.payload.doc.data()['codigoMesa'],
         detallePedido: e.payload.doc.data()['detallePedido'],
         estadoPedido: e.payload.doc.data()['estadoPedido'],
         tipoPedido: e.payload.doc.data()['tipoPedido'],
         cantidad: e.payload.doc.data()['cantidad'],
         monto: e.payload.doc.data()['monto'],
         idMozo: e.payload.doc.data()['idEmpleado']
       };
     })
     console.log(this.pedidos);
   });
    this.mesasService.getDetalleMesa(this.mimesa)
    .get()
    .then(eventSnapshot => {

     this.mesaActual = eventSnapshot.data();
     this.mesaActual.id = eventSnapshot.id;
     
   });
 
  }


  Descuentos()
  {
    
  
    var bandera=true;
    var bandera2=true;

    if("descuwnto 10% es true")
    {
      this.preciocondescuento10= ( this.montoTotal*10)/100;

      this.pedidos.forEach(element => {
        if( element.tipoPedido=="bebida" && bandera)
        this.preciounabebida  = element.monto/element.cantidad;
        bandera=false;
    
        
      });

      this.pedidos.forEach(element => {
        if( element.tipoPedido=="postre" && bandera2)
        {
          this.preciounpostre= element.monto/element.cantidad;
          bandera2=false;
      

        }
        
      });
    }
    // this.propina()
  }

  // propina():number
  // {
  //  let propina= this.valorpropina;
  //   let propinadada =0;
  //   if (propina =="20")
  //   {
  //     propinadada= (this.montoTotal*20)/100;
  //   }
  //   if(propina =="15")
  //   {
  //        propinadada =(this.montoTotal*15)/100;
  //   }
  //   if(propina =="10")
  //   {
  //     propinadada =(this.montoTotal*10)/100;

  //   }
  //   if(propina == "5")
  //   {
  //     propinadada =(this.montoTotal*5)/100;

  //   }
  //   if( propina =="0")
  //   {
  //     propinadada =(this.montoTotal*0)/100;

  //   }
  //   return propinadada;
  // }

 calcularprecio()
 {
   this.comidaService
     .getDetalleComida(this.codigoProducto)
     .get()
     .then(eventSnapshot => {

       this.comidaActual = eventSnapshot.data();
       this.comidaActual.id = eventSnapshot.id;
     });
// this.preciototalpedido=0;
this.cantidad=1;


 }
 cambioproducto()
 {
   this.preciototalpedido=this.precioUnitario;

 }




  ResetearMesa() {
   
  let record = {};
  record['estado'] = "Disponible";
  record['cliente'] = "";
  record['descuento10'] = false;
  record['descuentoBebida'] = false;
  record['descuentoPostre'] = false;
  record['estado'] = "Disponible";
  record['monto'] = 0;
  record['propina'] = 0;


  this.mesasService.ModificarMesa( this.codigoMesa, record);
 
  this.mostrarToast("Su pago ha sido depositado exitosamente", "successToast");
  this.router.navigateByUrl('/home');
}
eliminarPedidos()
{
  this.pedidos.forEach(element => {
    this.pedidosService.EliminarPedido( element.id);
    
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
  
  }

  
}
}