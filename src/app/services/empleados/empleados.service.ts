import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})

export class EmpleadosService {

  public listaEmpleadosRef: firebase.firestore.CollectionReference;
  public listaUsuariosRef: firebase.firestore.CollectionReference;

  constructor(private firestore: AngularFirestore) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.listaEmpleadosRef = firebase
          .firestore()
          .collection('/Empleado');
      }
      if (user)
      {
        this.listaUsuariosRef = firebase
        .firestore()
        .collection('/userProfile');
      }
    });
  }


  AltaEmpleado(empleado) {
    return this.firestore.collection('Empleado').add(empleado);
  }

  crearEmpleado(
    empleadoNombre: string,
    empleadoApellido: string,
    empleadoEmail: string,
    empleadoDNI: number,
    empleadoCUIL: number,
    empleadoPerfil : string,
    empleadoPicture: any = null
  ): Promise<firebase.firestore.DocumentReference> {
    this.listaUsuariosRef.add({
      email: empleadoEmail,
      clave: "Restaurante123",
      perfil: empleadoPerfil
    })
    return this.listaEmpleadosRef.add({
      nombre: empleadoNombre,
      apellido: empleadoApellido,
      email: empleadoEmail,
      dni: empleadoDNI,
      cuil: empleadoCUIL,
      perfil: empleadoPerfil
    }).then( ( newEmpleado ) => {

      if (empleadoPicture != null) {

              return this.cargarFoto(empleadoPicture, newEmpleado.id);
      }
    });
  }


  cargarFoto(fotos, id): Promise<firebase.firestore.DocumentReference> {
    let i = 0;
    let urls = [];
    let promise: any;
    for (const foto of fotos) {

      const storageRef = firebase.storage().ref(`/FotosEmpleado/${id}/empleado.${i}.png`);

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

    this.listaEmpleadosRef
    .doc(id)
    .update({ profilePicture: urls });
  return promise;


  }

  
  TraerEmpleados() {
    console.log("entro");
    return this.firestore.collection('Empleado').snapshotChanges();
  }

  //traer mozos
  TraerMozos() {
    console.log("entro");
    return this.firestore.collection( "Empleado" , ref => ref.where ( 'perfil' , '==' , 'Mozo' ) ).snapshotChanges ();

  }


  /*
  public TraerEmpleados(){
    return this.firestore.collection<IUsuario>('Empleado').valueChanges();
  }
  */
  ModificarEmpleado(recordID,record){
  this.firestore.doc('Empleado/' + recordID).update(record);
  }

  EliminarEmpleado(record_id) {
  this.firestore.doc('Empleado/' + record_id).delete();
  }

  TraerClientePorNombre($nombre)
{
  return this.firestore.collection('cliente', ref => ref.where('nombre', '>=', $nombre)
  .where('nombre', '<=', $nombre + '\uf8ff'))
  .snapshotChanges();

}

ModificarMontoDeunaMesa(id,codigo)
{
  //this.firestore.doc('Mesas/'+id).update({ monto: monto });
  this.firestore.doc('cliente/' + id).update({codigoUid: codigo})
  }



}

