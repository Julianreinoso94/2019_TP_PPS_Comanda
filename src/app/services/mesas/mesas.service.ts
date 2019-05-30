import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class MesasService {

  public listaMesasRef: firebase.firestore.CollectionReference;

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.listaMesasRef = firebase
          .firestore()
          .collection(`/Mesas`);
      }
    });
  }

  crearMesa(
    mesaId: number,
    mesaCantPersonas: number,
    mesaTipo: string,
    mesaEstado: string,
    mesaPicture: any = null
  ): Promise<firebase.firestore.DocumentReference> {
    return this.listaMesasRef.add({
      id: mesaId,
      cantPersonas: mesaCantPersonas,
      tipo: mesaTipo,
      estado: mesaEstado
    }).then( ( newMesa ) => {

      if (mesaPicture != null) {
        // return firebase.firestore().runTransaction(transaction => {

          // return transaction.get(this.listaComidasRef.doc(newComida.id)).then(comidaDoc => {

              return this.cargarFoto(mesaPicture, newMesa.id);

            // });
          // });
      }
    });
  }

  getComidasList(): firebase.firestore.CollectionReference {
    return this.listaMesasRef;
  }

  getDetalleComida(eventId: string): firebase.firestore.DocumentReference {
    return this.listaMesasRef.doc(eventId);
  }

  cargarFoto(fotos, id): Promise<firebase.firestore.DocumentReference> {
    let i = 0;
    let urls = [];
    let promise: any;
    for (const foto of fotos) {

      const storageRef = firebase.storage().ref(`/fotos/${id}/mesa.${i}.png`);

      promise = storageRef.putString(foto.data, 'data_url')
        .then(() => {

          storageRef.getDownloadURL().then(downloadURL => {
            urls[i] = downloadURL;
            // urls.unshift({
            //     i: downloadURL
            // });
          });
        }, (err) => {
          alert(err.name + ' ' + err.message);
        });
      i++;
    }

    this.listaMesasRef
      .doc(id)
      .update({ profilePicture: urls });
    return promise;

  }



}
