import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IUsuario } from "../../clases/usuario";
import { Observable } from "rxjs";
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})

export class EmpleadosService {

  constructor(
    private firestore: AngularFirestore
  ) {}


  /*
  public buscarEmpleado(buscado: IUsuario) {
    let empleados: IUsuario[];
    this.firestore.collection<IUsuario>("Empleado")
      .valueChanges()
      .subscribe(data => {
        empleados = data.filter(empleado => empleado.email == buscado.email);
        return empleados;
      });
  }
*/

  AltaEmpleado(empleado) {
    return this.firestore.collection('Empleado').add(empleado);
  }

  
  /*
    public guardarEmpleado(guardado: IUsuario) {
    let uid = firebase.auth().currentUser.uid;
    return this.firestore.collection("Empleado").add({
      apellido: guardado.apellido,
      cuil: guardado.cuil,
      dni: guardado.dni,
      email: guardado.email,
      foto: guardado.foto,
      nombre: guardado.nombre,
      perfil: guardado.perfil,
      id: uid

    });
  }
  */

 public errorAuth(error: any) {
  let errorCode = error.code;
  let loadingError;
  if (errorCode === "auth/invalid-email") {
    return "Mail invalido";
  } else if (errorCode === "auth/email-already-in-use") {
    return "El mail ya se encuentra utilizado";
  } else if (errorCode === "auth/operation-not-allowed") {
    return "el usuario no fue encontrado";
  } else if (errorCode === "auth/weak-password") {
    return "La contraseña no es lo suficientemente segura";
  } else {
    return "Ha ocurrido un error";
  }
}
  

  
  TraerEmpleados() {
    console.log("entro");
    return this.firestore.collection('Empleado').snapshotChanges();
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


}

