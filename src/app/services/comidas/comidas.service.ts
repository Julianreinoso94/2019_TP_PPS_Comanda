import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ComidasService {
  public listaComidasRef: firebase.firestore.CollectionReference;
  constructor(
    public toastCtrl: ToastController,
    private firestore: AngularFirestore
  ) {
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
    //comidaPicture: any = null,
    tipo: string
  ): Promise<firebase.firestore.DocumentReference> {
    return this.listaComidasRef.add({
      comidaCodigo: comidaCodigo,
      name: comidaName,
      description: comidaDescription,
      price: comidaPrice,
      time: comidaTime,
      tipo:tipo
    });
    this.mostrarToast("Comida cargada!", "Danger Toast");
  }

  public async mostrarToast(miMsj:string,color:string)
  {
    let toast = await this.toastCtrl.create({
      showCloseButton: true,
      closeButtonText:"cerrar",
      cssClass: color,
      message: miMsj,
      duration: 3000,
      position: 'top'
    });
    return await toast.present();
  }

  getComidasList(): firebase.firestore.CollectionReference {
    return this.listaComidasRef;
  }

  traerComidas()
  {
    return this.firestore.collection('listaComida', ref => ref.where('tipo', '>=', 'comida')
    .where('tipo', '<=', 'comida' + '\uf8ff'))
    .snapshotChanges();
  }

  traerBebidas()
  {
    return this.firestore.collection('listaComida', ref => ref.where('tipo', '>=', 'bebida')
    .where('tipo', '<=', 'bebida' + '\uf8ff'))
    .snapshotChanges();
  }

  traerPostres()
  {
    return this.firestore.collection('listaComida', ref => ref.where('tipo', '>=', 'postre')
    .where('tipo', '<=', 'postre' + '\uf8ff'))
    .snapshotChanges();
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
