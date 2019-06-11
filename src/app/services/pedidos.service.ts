import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { ComidasService } from '../services/comidas.service';


@Injectable({
  providedIn: 'root'
})
export class PedidosService {

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
  }


  crearPedido(
    codigoPedido: number,
    codigoMesa: number,
    codigoProducto: number,
    cantidad: number,
    tipoPedido: string,
    detallePedido: string,
    estadoPedido: string,
    //horaEntrega: string,
    idEmpleado: number

  ): Promise<firebase.firestore.DocumentReference> {
    return this.listaPedidosRef.add({
      codigoPedido: codigoPedido,
      codigoMesa: codigoMesa,
      codigoProducto: codigoProducto,
      tipoPedido: tipoPedido,
      estadoPedido: estadoPedido,
      cantidad: cantidad,
      idEmpleado: idEmpleado,
      detallePedido: detallePedido,
      //horaEntrega: mesaCliente,
      monto: this.calcularMontoPedido(codigoProducto, cantidad),
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






}
