import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class ComidasService {
  public listaComidasRef: firebase.firestore.CollectionReference;
  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.listaComidasRef = firebase
          .firestore()
          .collection(`/listaComida`);
      }
    });
  }

  crearComida(
    comidaCodigo: number,
    comidaName: string,
    comidaDescription: string,
    comidaPrice: number,
    comidaTime: number,
    comidaPicture: any = null,
    tipo: string
  ): Promise<firebase.firestore.DocumentReference> {
    return this.listaComidasRef.add({
      comidaCodigo: comidaCodigo,
      name: comidaName,
      description: comidaDescription,
      price: comidaPrice,
      time: comidaTime,
      tipo:tipo
    }).then( ( newComida ) => {

      if (comidaPicture != null) {
        // return firebase.firestore().runTransaction(transaction => {

          // return transaction.get(this.listaComidasRef.doc(newComida.id)).then(comidaDoc => {

              return this.cargarFoto(comidaPicture, newComida.id);

            // });
          // });
      }
    });
  }

  getComidasList(): firebase.firestore.CollectionReference {
    return this.listaComidasRef;
  }

  getDetalleComida(comidaId: string): firebase.firestore.DocumentReference {
    return this.listaComidasRef.doc(comidaId);
  }

  deleteComida(comidaId: string): any {
    return this.listaComidasRef.doc(comidaId).delete();
  }

  cargarFoto(fotos, id): Promise<firebase.firestore.DocumentReference> {
    let i = 0;
    let urls = [];
    let promise: any;
    for (const foto of fotos) {

      const storageRef = firebase.storage().ref(`/fotos/${id}/comida.${i}.png`);

      promise = storageRef.putString(foto.data, 'data_url')
        .then(() => {

          storageRef.getDownloadURL().then(downloadURL => {
            this.listaComidasRef.doc( id).update(`{foto_${i}` , downloadURL)
            //urls[i] = downloadURL;
          });
        }, (err) => {
          alert(err.name + ' ' + err.message);
        });
      i++;
    }

    return promise;


  }
}
