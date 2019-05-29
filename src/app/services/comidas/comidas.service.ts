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
    comidaName: string,
    comidaDescription: string,
    comidaPrice: number,
    comidaTime: number,
    comidaPicture: any = null
  ): Promise<firebase.firestore.DocumentReference> {
    return this.listaComidasRef.add({
      name: comidaName,
      description: comidaDescription,
      price: comidaPrice,
      time: comidaTime
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

  getDetalleComida(eventId: string): firebase.firestore.DocumentReference {
    return this.listaComidasRef.doc(eventId);
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

    this.listaComidasRef
      .doc(id)
      .update({ profilePicture: urls });
    return promise;


  }
}
