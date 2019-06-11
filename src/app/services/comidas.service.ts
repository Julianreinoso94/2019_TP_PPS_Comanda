import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ComidasService {
  public listaComidasRef: firebase.firestore.CollectionReference;
  constructor(private firestore: AngularFirestore) {
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
    comidaTime: string,
    //comidaTipo: string,
    comidaPicture: any = null
  ): Promise<firebase.firestore.DocumentReference> {
    return this.listaComidasRef.add({
      codigo: comidaCodigo,
      name: comidaName,
      description: comidaDescription,
      price: comidaPrice,
      //tipo: comidaTipo,
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
          });
        }, (err) => {
          alert(err.name + ' ' + err.message);
        });
      i++;
    }

    // this.listaComidasRef
    //   .doc(id)
    //   .update({ profilePicture: urls });
    return promise;
  }

  TraerPrecioPorProducto($idProducto)
  {
    /*
    var query = this.listaComidasRef.where("codigo", "==", $idProducto);
    return query;
    */

      return this.firestore.collection('listaComida', ref => ref.where('codigo', '>=', $idProducto)
      .where('codigo', '<=', $idProducto + '\uf8ff'))
      .snapshotChanges();
  }


}
