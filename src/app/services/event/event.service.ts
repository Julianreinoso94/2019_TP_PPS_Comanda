import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  public idUsuarioLogeado: any;
  public eventListRef: firebase.firestore.CollectionReference;
  public clienteListRef: firebase.firestore.CollectionReference;
  public encuestaEmpleadoRef: firebase.firestore.CollectionReference;
  public listaEspera: firebase.firestore.CollectionReference;
  constructor(private firestore: AngularFirestore) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.idUsuarioLogeado = user.uid;

        this.eventListRef = firebase
          .firestore()
          .collection(`/userProfile/${user.uid}/eventList`);

        this.clienteListRef = firebase
          .firestore()
          .collection(`/cliente/`);

        this.encuestaEmpleadoRef = firebase
          .firestore()
          .collection(`/encuestaEmpleado/`);

          this.listaEspera = firebase
            .firestore()
            .collection(`/listaEspera/`);
      }
    });
  }

  createEvent(
    eventName: string,
    eventDate: string,
    eventPrice: number,
    eventCost: number
  ): Promise<firebase.firestore.DocumentReference> {
    return this.eventListRef.add({
      name: eventName,
      date: eventDate,
      price: eventPrice * 1,
      cost: eventCost * 1,
      revenue: eventCost * -1,
    });
  }

  getEventList(): firebase.firestore.CollectionReference {
    return this.eventListRef;
  }

  getEventDetail(eventId: string): firebase.firestore.DocumentReference {
    return this.eventListRef.doc(eventId);
  }

  addGuest(
    guestName: string,
    eventId: string,
    eventPrice: number,
    guestPicture: string = null
  ): Promise<void> {

    try {
    return this.eventListRef
      .doc(eventId)
      .collection('guestList')
      .add({ guestName })
      .then((newGuest) => {
        return firebase.firestore().runTransaction(transaction => {
          return transaction.get(this.eventListRef.doc(eventId)).then(eventDoc => {
            const newRevenue = eventDoc.data().revenue + eventPrice;
            transaction.update(this.eventListRef.doc(eventId), { revenue: newRevenue });

            if (guestPicture != null) {

              const storageRef = firebase
                .storage()
                .ref(`/guestProfile/${newGuest.id}/profilePicture.png`);

              return storageRef
                .putString(guestPicture, 'data_url')
                .then(() => {
                  // alert('Guardo string');
                  return storageRef.getDownloadURL().then(downloadURL => {
                    // alert('dos: ' + downloadURL);
                    return this.eventListRef
                      .doc(eventId)
                      .collection('guestList')
                      .doc(newGuest.id)
                      .update({ profilePicture: downloadURL });
                  });
                }, (err) => {
                  alert(err.name + ' ' + err.message);
                });
            }
          });
        });
      });
    } catch (error) {
       alert(error);
       console.error(error);
    }
  }

  cargarCliente(
    clienteName: string,
    clienteLastname: string,
    clienteDni: any,
    clientePicture: any = null,
  ): Promise<firebase.firestore.DocumentReference> {
    return this.clienteListRef.add({
      nombre: clienteName,
      apellido: clienteLastname,
      dni: clienteDni,
      perfil:"Cliente",
      codigoUid:""
    }).then( ( newCliente ) => {

      if (clientePicture != null) {

        return this.cargarFoto(clientePicture, newCliente.id);

      }
    });
  }

  cargarFoto(fotos, id): Promise<firebase.firestore.DocumentReference> {
    let i = 0;
    let urls = [];
    let promise: any;
    for (const foto of fotos) {

      const storageRef = firebase.storage().ref(`/fotos/${id}/cliente.${i}.png`);

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

    return promise;
  }

  /*
    ENCUESTA DE EMPLEADOS
  */
  cargarEncuesta(
    pUnidad: string,
    pSelect: string,
    pPorcentaje: number,
    pCantidad: number,
    pTexto: string,
    guestPicture: any = null
  ): Promise<void> {
    let promesaEncuesta: any;
    try {
    promesaEncuesta = this.encuestaEmpleadoRef
      .add({
        unidad: pUnidad,
        select: pSelect,
        porcentaje: pPorcentaje,
        cantidad: pCantidad,
        texto: pTexto
      })
      .then((newEnc) => {

            if (guestPicture != null) {

              const storageRef = firebase
                .storage()
                .ref(`/encuestaEmpleado/${newEnc.id}/fotoEncuesta.png`);

              return storageRef
                .putString(guestPicture, 'data_url')
                .then(() => {
                  // alert('Guardo string');
                  return storageRef.getDownloadURL().then(downloadURL => {
                    // alert('dos: ' + downloadURL);
                    return this.encuestaEmpleadoRef
                      .doc(newEnc.id)
                      .update({ fotoEncuesta: downloadURL });
                  });
                }, (err) => {
                  alert(err.name + ' ' + err.message);
                });
            }
          });

    } catch (error) {
       alert(error);
       console.error(error);
    }
    return promesaEncuesta;
  }

  getEncuestatList(): firebase.firestore.CollectionReference {
    return this.encuestaEmpleadoRef;
  }

  guardarListaEspera(
    // listaNombre: string,
    // listaApellido: string,
    // listaEmail: number,
    // listaCantidad: number
  ): Promise<firebase.firestore.DocumentReference> {
    return this.listaEspera.add({
      uid: this.idUsuarioLogeado,
      estado: 'En espera',
//      fecha: eventCost * -1,
      status: 1
    });
  }

  getListaEspera(){
   // return this.listaEspera;
    return this.firestore.collection('listaEspera').snapshotChanges();

  }

  AceptarClientelistaEspera(id,estado)
  {
    //this.firestore.doc('Mesas/'+id).update({ monto: monto });
    this.firestore.doc('listaEspera/' + id).update({estado: estado})
  }
  EliminarClientelistaEspera(id)
  {
    //this.firestore.doc('Mesas/'+id).update({ monto: monto });
    this.firestore.doc('listaEspera/' + id).delete();
  }
}
