import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {EmpleadosService} from '../../services/empleados/empleados.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
public userProfile: firebase.firestore.DocumentReference;

  constructor(    private empleadosService: EmpleadosService,
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

  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
    return firebase.auth().signOut();
  }
}
