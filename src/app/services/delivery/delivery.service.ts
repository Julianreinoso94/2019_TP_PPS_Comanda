import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Time } from '@angular/common';
import { DatePipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  public currentUser: firebase.User;
  uidUsuario:any;
   public listaMesasRef: firebase.firestore.CollectionReference;

  constructor(private firestore: AngularFirestore) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.listaMesasRef = firebase
          .firestore()
          .collection('/Delivery');
      }
    });
  }

  
  crearDelivery(
    codigo:string,
    direccion: any,
    monto: string,
    propina:string,
   juego:boolean,
   juego10:boolean,
   juegopostre:boolean,
   estado:string


  ): Promise<firebase.firestore.DocumentReference> {
    return this.listaMesasRef.add({
      codigo: codigo,
    direccion: direccion,
    monto:monto,
    propina:propina,
    juego:juego,
    juegopostre:juego10,
    juego10:juego10,
    estado:estado

    })
  }

  TraerMesas() {
    // console.log("entro");
    return this.firestore.collection('Mesas').snapshotChanges();
  }
  TraerMesaPorCodigo($idProducto)
  {
    /*
    var query = this.listaComidasRef.where("codigo", "==", $idProducto);
    return query;
    */

      return this.firestore.collection('Mesas', ref => ref.where('codigo', '>=', $idProducto)
      .where('codigo', '<=', $idProducto + '\uf8ff'))
      .snapshotChanges();
  }
}
