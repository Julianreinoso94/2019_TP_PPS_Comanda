import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class SupervisorService {


  public listaSupervisorRef: firebase.firestore.CollectionReference;
  public listaUsuariosRef: firebase.firestore.CollectionReference;

  constructor(private firestore: AngularFirestore) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.listaSupervisorRef = firebase
          .firestore()
          .collection('/Supervisor');
      }
      if (user)
      {
        this.listaUsuariosRef = firebase
        .firestore()
        .collection('/userProfile');
      }
    });
  }


    
  TraerSupervisores() {
    console.log("entro");
    return this.firestore.collection('Supervisor').snapshotChanges();
  }

  EliminarSupervisor(record_id) {
    this.firestore.doc('Supervisor/' + record_id).delete();
    }



}

