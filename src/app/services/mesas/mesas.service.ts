import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Time } from '@angular/common';
import { DatePipe } from '@angular/common';


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
    propina: number,
    diaReserva: string,
    horarioReserva:string,

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
      propina: propina,
      dia:diaReserva,
      horario:horarioReserva,

    }).then( ( newMesa ) => {

      if (mesaPicture != null) {

              return this.cargarFoto(mesaPicture, newMesa.id);
      }
    });
  }

  //traer mesa por estado


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
    // console.log("entro");
    return this.firestore.collection('Mesas').snapshotChanges();
  }

  TraerMesasDisponibles()
{
  // console.log("entro");

  return this.firestore.collection('Mesas', ref => ref.where('estado', '>=', 'Disponible')
  .where('estado', '<=', 'Disponible' + '\uf8ff'))
  .snapshotChanges();

}

// TraerMesaPorCodigo(codigo)
// {
//   // console.log("entro");

//   return this.firestore.collection('Mesas', ref => ref.where('codigo', '==', codigo)
//   .where('codigo', '==', codigo + '\uf8ff'))
//   .snapshotChanges();

// }
TraerMesaPorCodigo($idProducto)
  {
    /*
    var query = this.listaComidasRef.where("codigo", "==", $idProducto);
    return query;
    */

      return this.firestore.collection('Mesas', ref => ref.where('codigo', '>=', $idProducto)
      .where('codigo', '<=', $idProducto + '\uf8ff'))
      .snapshotChanges();
  }

  consultamesacliente($idProducto)
  {
    /*
    var query = this.listaComidasRef.where("codigo", "==", $idProducto);
    return query;
    */

      return this.firestore.collection('Mesas', ref => ref.where('cliente', '>=', $idProducto)
      .where('cliente', '<=', $idProducto + '\uf8ff'))
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


  getDetalleMesa(mesaid: string): firebase.firestore.DocumentReference {
    return this.listaMesasRef.doc(mesaid);
  }
//ModificarMontoDeunaMesa
  ModificarMontoDeunaMesa(id,monto)
  {
    //this.firestore.doc('Mesas/'+id).update({ monto: monto });
    this.firestore.doc('Mesas/' + id).update({monto: monto})
  }
  Modificarclientedeunamesa(id)
  {
    this.firestore.doc('Mesas/' + id).update({cliente:""})

  }

  AsignarClienteaMesa(id,cliente ,estado)
  {
    //this.firestore.doc('Mesas/'+id).update({ monto: monto });
    this.firestore.doc('Mesas/' + id).update({cliente: cliente,estado:estado})
  }

  ModificarEstadoDeunaMesa(id,estado)
  {
    //this.firestore.doc('Mesas/'+id).update({ monto: monto });
    this.firestore.doc('Mesas/' + id).update({estado: estado})
  }


  EliminarMesa(record_id) {
  this.firestore.doc('Mesas/' + record_id).delete();
  }

  //ModificarMontoDeunaMesa
  AgregarDesc10(id, valor)
  {
    //this.firestore.doc('Mesas/'+id).update({ monto: monto });
    this.firestore.doc('Mesas/' + id).update({descuento10: valor})
  }

  AgregarDescBebida(id, valor)
  {
    //this.firestore.doc('Mesas/'+id).update({ monto: monto });
    this.firestore.doc('Mesas/' + id).update({descuentoBebida: valor})
  }

  AgregarDescPostre(id, valor)
  {
    //this.firestore.doc('Mesas/'+id).update({ monto: monto });
    this.firestore.doc('Mesas/' + id).update({descuentoPostre: valor})
  }

  
  Agregapropina(id, valor)
  {
    //this.firestore.doc('Mesas/'+id).update({ monto: monto });
    this.firestore.doc('Mesas/' + id).update({propina: valor})
  }


  //traer preciototal de mesa
  //editar preciototaldemesa



}
