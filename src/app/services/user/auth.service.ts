import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {EmpleadosService} from '../../services/empleados/empleados.service';
import { AngularFirestore } from "@angular/fire/firestore";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
public userProfile: firebase.firestore.DocumentReference;

  constructor(    private empleadosService: EmpleadosService,
    private db : AngularFirestore
    ) { }

  loginUser(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  signupUser(email: string, password: string): Promise<any> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((newUserCredential: firebase.auth.UserCredential) => {
        firebase
          .firestore()
          .doc(`/userProfile/${newUserCredential.user.uid}`)
          .set({ email });

      })
      .catch(error => {
        console.error(error);
        throw new Error(error);
      });
  }
  
  signupUserCliente(email: string, password: string,Perfil:string,record,codigo :string): Promise<any> {

    if(Perfil=="Cliente")
    {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((newUserCredential: firebase.auth.UserCredential) => {
        // firebase
        //   .firestore()
        //   .doc(`/cliente/${newUserCredential.user.uid}`)
        //   .set({ record })
          
        this.empleadosService.ModificarMontoDeunaMesa(codigo,newUserCredential.user.uid);
          
    
      // this.userProfil<e.update({ Perfil });  
      })
      .catch(error => {
        console.error(error);
        throw new Error(error);
      });
    }
    if(Perfil=="Mozo")
    {

    }
    if(Perfil=="bartender")
    {

    }
    if(Perfil=="Cocinero")
    {

    }
    if(Perfil=="Anonimo")
    {
      
    }
    if(Perfil=="Supervisor")
    {
      
    }


    
  }

  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
    return firebase.auth().signOut();
  }

  registerUser(email:string, password:string){
    return firebase.auth().createUserWithEmailAndPassword( email, password)
    .then((res)=>{
     console.log("el usuario se ha creado exitosamente")
    })
    .catch(err=>Promise.reject(err))
 }

 
 register(email : string, password : string, dni: string, nombre: string, apellido: string, foto:string){

  return new Promise ((resolve, reject) => {
    firebase.auth().createUserWithEmailAndPassword(email, password).then( res =>{
        // console.log(res.user.uid);
      const uid = res.user.uid;
        this.db.collection('cliente').doc(uid).set({
          //name : name,
          uid : uid,
          nombre: nombre,
          perfil: "cliente",
          dni: dni,
          email: email,
          clave: password,
          apellido: apellido, 
          foto: foto
        })

        this.db.collection('userProfile').doc(uid).set({
          //name : name,
          uid : uid,
          //nombre: nombre,
          perfil: "cliente",
          //dni: dni,
          email: email,
          //clave: password
        })

        firebase.auth().currentUser.sendEmailVerification();
      
      resolve(res)
    }).catch( err => reject(err))
  })
}

//EMPLEADO

registerEmpleado(email : string, password : string, dni: string, nombre: string, apellido: string, cuil: string, perfil: string, foto:string){

  return new Promise ((resolve, reject) => {
    firebase.auth().createUserWithEmailAndPassword(email, password).then( res =>{
        // console.log(res.user.uid);
      const uid = res.user.uid;
        this.db.collection('Empleado').doc(uid).set({
          //name : name,
          uid : uid,
          nombre: nombre,
          perfil: perfil,
          dni: dni,
          email: email,
          clave: password,
          apellido: apellido, 
          foto: foto,
          cuil: cuil
        })

        this.db.collection('userProfile').doc(uid).set({
          //name : name,
          uid : uid,
          //nombre: nombre,
          perfil: perfil,
          //dni: dni,
          email: email,
          //clave: password
        })
      
      resolve(res)
    }).catch( err => reject(err))
  })
}


//SUPERVISOR

registerSupervisor(email : string, password : string, dni: string, nombre: string, apellido: string, cuil: string, perfil: string, foto:string){

  return new Promise ((resolve, reject) => {
    firebase.auth().createUserWithEmailAndPassword(email, password).then( res =>{
        // console.log(res.user.uid);
      const uid = res.user.uid;
        this.db.collection('Supervisor').doc(uid).set({
          //name : name,
          uid : uid,
          nombre: nombre,
          perfil: perfil,
          dni: dni,
          email: email,
          clave: password,
          apellido: apellido, 
          foto: foto,
          cuil: cuil
        })

        this.db.collection('userProfile').doc(uid).set({
          //name : name,
          uid : uid,
          //nombre: nombre,
          perfil: perfil,
          //dni: dni,
          email: email,
          //clave: password
        })

      
      resolve(res)
    }).catch( err => reject(err))
  })
}


}
