import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { ComidasService } from '../services/comidas.service';
import { and } from '@angular/router/src/utils/collection';


import 'firebase/auth';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  uidcliente:any;
  public currentUser: firebase.User;


  public fecha =  new Date();

  public listaPedidosRef: firebase.firestore.CollectionReference;

  constructor(private firestore: AngularFirestore, private servComidas: ComidasService) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.listaPedidosRef = firebase
          .firestore()
          .collection('/Pedidos');
      }
    });

    firebase.auth().onAuthStateChanged(user => {
 
      this.currentUser = user;
      this.uidcliente = user.uid});
    
  }


  crearPedido(
    codigoPedido: number,
    codigoMesa: string,
    codigoProducto: string,
    tipoproducto: string,
        estadoPedido: string,
    cantidad: number,
    idEmpleadomozo: number,
    preciototalpedido:number,
    //horaEntrega: string,

  ): Promise<firebase.firestore.DocumentReference> {
    alert("servicio");

    return this.listaPedidosRef.add({
      codigoPedido: codigoPedido,
      codigoMesa: codigoMesa,
      codigoProducto: codigoProducto,
      tipoPedido: tipoproducto,
      estadoPedido: estadoPedido,
      cantidad: cantidad,
      idEmpleadomozo: idEmpleadomozo,      //horaEntrega: mesaCliente,
      monto:preciototalpedido,
      idCliente:this.uidcliente,
      tiempoEstimado: this.fecha
      //propina: propina
    });
  }

  calcularMontoPedido($idProducto:number, $cantidad:number)
  {
    let precioUnitario = 0;

    this.servComidas.TraerPrecioPorProducto($idProducto).subscribe(data =>
      {
        let precio = data.map(e =>
          precioUnitario = e.payload.doc.data()['price']
          )
      }
      );

      let montoTotal = precioUnitario * $cantidad;

      return montoTotal;
    }



    TraerPedidosPorEstado($estado)
    {
      return this.firestore.collection('Pedidos', ref => ref.where('estado', '>=', $estado)
      .where('estado', '<=', $estado + '\uf8ff'))
      .snapshotChanges();
    }


  TraerPedidos() {
    console.log("entro");
    return this.firestore.collection('Pedidos').snapshotChanges();
  }

  //traer pedidos si es cocina.
  TraerPedidosPorTipo()
    {
      return this.firestore.collection('Pedidos', ref => ref.where('tipoPedido', '>=', "Cocina")
      .where('tipoPedido', '<=', "Cocina" + '\uf8ff'))
      .snapshotChanges();
    }



    
   
    //traer pedidos  por mesa
  TraerPedidosPorMesa($id)
  {
    return this.firestore.collection('Pedidos', ref => ref.where('codigoMesa', '>=', $id)
    .where('codigoMesa', '<=', $id+ '\uf8ff'))
    .snapshotChanges();
  }

  //traer pedidos si es bebida.

    /*
    public TraerEmpleados(){
      return this.firestore.collection<IUsuario>('Empleado').valueChanges();
    }
    */
    ModificarPedido(recordID,record){
    this.firestore.doc('Pedidos/' + recordID).update(record);
    }

    EliminarPedido(record_id) {
    this.firestore.doc('Pedidos/' + record_id).delete();
    }


   //PARA MOZO///////////////////////////////////////////////////////////////////////////////////////
   
   confirmarpedidosclientes()
   {
     return this.firestore.collection('Pedidos', ref => ref.where('estadoPedido', '>=', "PendienteDeAprobacion")
     .where('estadoPedido', '<=', "PendienteDeAprobacion" + '\uf8ff'))
 
     .snapshotChanges();
   }

   TraerPedidosListoParaentregar()
   {
     return this.firestore.collection('Pedidos', ref => ref.where('tipoPedido', '>=', "Bebida")
     .where('tipoPedido', '<=', "Bebida" + '\uf8ff'))&&
     this.firestore.collection('Pedidos', ref => ref.where('estadoPedido', '>=', "ListoParaentregar")
     .where('estadoPedido', '<=', "ListoParaentregar" + '\uf8ff'))
 
     .snapshotChanges();
   }
//cocinero o barman
   TraerPedidosPorTipoCocina()
   {
     return this.firestore.collection('Pedidos', ref => ref.where('tipoPedido', '>=', "Cocina")
     .where('tipoPedido', '<=', "Cocina" + '\uf8ff'))
     .snapshotChanges();
   }


   TraerPedidosPorTipoBebida()
   {
     return this.firestore.collection('Pedidos', ref => ref.where('tipoPedido', '>=', "Bebida")
     .where('tipoPedido', '<=', "Bebida" + '\uf8ff'))&&
     this.firestore.collection('Pedidos', ref => ref.where('estadoPedido', '>=', "EnProceso")
     .where('estadoPedido', '<=', "EnProceso" + '\uf8ff'))
 
     .snapshotChanges();

    // return this.listaPedidosRef.where('tipoPedido', '==', 'cocina').where('estadoPedido', '==', 'Enproceso')

   }

   entregarpedido(id,estado)
   {
     //this.firestore.doc('Mesas/'+id).update({ monto: monto });
     this.firestore.doc('Pedidos/' + id).update({estadoPedido: estado})
   }

   //CLIENTE CONFIRMA RECEPCION
   
   confirmarRecepcion(id)
   {
     return this.firestore.collection('Pedidos', ref => ref.where('idCliente', '>=', id)
     .where('idCliente', '<=',id + '\uf8ff'))
 
     .snapshotChanges();
   }
   

   probando()
   {
    
    return this.listaPedidosRef.where('tipoPedido', '==', 'Bebida').where('estadoPedido', '==', 'Enproceso')

   }



}
