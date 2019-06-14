import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})

export class MesasService {

  public listaMesasRef: firebase.firestore.CollectionReference;

  constructor(private firestore: AngularFirestore) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.listaMesasRef = firebase
          .firestore()
          .collection('/Mesas');
      }
    });
  }


  crearMesa(
    mesaCodigo: number,
    mesaCantPersonas: any,
    mesaTipo: string,
    mesaEstado: string,
    mesaPicture: any = null,
    mesaCliente: string,
    mesaDesc10: boolean,
    mesaDescBebida: boolean,
    mesaDescPostre: boolean,
    monto: number,
    propina: number
  ): Promise<firebase.firestore.DocumentReference> {
    return this.listaMesasRef.add({
      codigo: mesaCodigo,
      cantPersonas: mesaCantPersonas,
      tipo: mesaTipo,
      estado: mesaEstado,
      cliente: mesaCliente,
      descuento10: mesaDesc10,
      descuentoBebida: mesaDescBebida,
      descuentoPostre: mesaDescPostre,
      monto: monto,
      propina: propina
    }).then( ( newMesa ) => {

      if (mesaPicture != null) {

              return this.cargarFoto(mesaPicture, newMesa.id);
      }
    });
  }


  cargarFoto(fotos, id): Promise<firebase.firestore.DocumentReference> {
    let i = 0;
    let urls = [];
    let promise: any;
    for (const foto of fotos) {

      const storageRef = firebase.storage().ref(`/FotosMesa/${id}/mesa.${i}.png`);

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


  TraerMesas() {
    console.log("entro");
    return this.firestore.collection('Mesas').snapshotChanges();
  }

  TraerMesasDisponibles()
{
  console.log("entro");

  return this.firestore.collection('Mesas', ref => ref.where('estado', '>=', 'Ocupado')
  .where('estado', '<=', 'Ocupado' + '\uf8ff'))
  .snapshotChanges();

}



  /*
  public TraerEmpleados(){
    return this.firestore.collection<IUsuario>('Empleado').valueChanges();
  }
  */
  ModificarMesa(recordID,record){
  this.firestore.doc('Mesas/' + recordID).update(record);
  }


//ModificarMontoDeunaMesa
  ModificarMontoDeunaMesa(id,monto)
  {
    //this.firestore.doc('Mesas/'+id).update({ monto: monto });
    this.firestore.doc('Mesas/' + id).update({monto: monto})
    }

  EliminarMesa(record_id) {
  this.firestore.doc('Mesas/' + record_id).delete();
  }

  //traer preciototal de mesa
  //editar preciototaldemesa



}
