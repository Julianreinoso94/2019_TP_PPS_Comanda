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
export class ReservasService {

  public listaMesasRef: firebase.firestore.CollectionReference;

  constructor(private firestore: AngularFirestore) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.listaMesasRef = firebase
          .firestore()
          .collection('/Reservas');
      }
    });
  }

  crearReserva(
    usuario: string,
    fechareserva: string,
    horareserva: string,
    cantidad:string

      ): Promise<firebase.firestore.DocumentReference> {
    return this.firestore.collection(`/Reservas/`).add({
      usuario: usuario,
      fechareserva: fechareserva,
      horareserva: horareserva,
      estado:"Pendiente de Aprobacion",
      cantidad:cantidad,
      mesa:""
    
      
    })
  }
  AceptarReservaPendiente(id,monto,mesa)
{
  //this.firestore.doc('Mesas/'+id).update({ monto: monto });
  this.firestore.doc('Reservas/' + id).update({estado: monto,mesa:mesa})
}

  TraerReservas() {
    // console.log("entro");
    return this.firestore.collection('Reservas').snapshotChanges();
  }
  EliminarReserva(record_id) {
    this.firestore.doc('Reservas/' + record_id).delete();
    }

TraerMesaPorCodigo($idProducto)
  {
      return this.firestore.collection('Mesas', ref => ref.where('codigo', '>=', $idProducto)
      .where('codigo', '<=', $idProducto + '\uf8ff'))
      .snapshotChanges();
  }

  ModificarMesa(recordID,record){
    this.firestore.doc('Mesas/' + recordID).update(record);
  }


  getDetalleMesa(mesaid: string): firebase.firestore.DocumentReference {
    return this.listaMesasRef.doc(mesaid);
  }
//ModificarMontoDeunaMesa


  ModificarMontoDeunaMesa(id,monto)
  {
    //this.firestore.doc('Mesas/'+id).update({ monto: monto });
    this.firestore.doc('Mesas/' + id).update({monto: monto})
  }

  AceptarReserva(id,estado)
  {
    //this.firestore.doc('Mesas/'+id).update({ monto: monto });
    this.firestore.doc('Mesas/' + id).update({estado: estado})
  }

 
  //ModificarMontoDeunaMesa
  AgregarDesc10(id, valor)
  {
    //this.firestore.doc('Mesas/'+id).update({ monto: monto });
    this.firestore.doc('Mesas/' + id).update({descuento10: valor})
  }



}
