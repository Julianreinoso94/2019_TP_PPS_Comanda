import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  public listaClientesRef: firebase.firestore.CollectionReference;
  public listaUsuariosRef: firebase.firestore.CollectionReference;

  constructor(
    private firestore: AngularFirestore
  ) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.listaClientesRef = firebase
          .firestore()
          .collection('/cliente');
      }
      if (user)
      {
        this.listaUsuariosRef = firebase
        .firestore()
        .collection('/userProfile');
      }
    });
   }

   TraerClientes() {
    return this.firestore.collection('cliente').snapshotChanges();
  }

  ConfirmarCliente(email,estado)
  {
    //this.firestore.doc('Mesas/'+id).update({ monto: monto });
    this.firestore.doc('clientes/' + email).update({activado: estado})
  }
  
  }