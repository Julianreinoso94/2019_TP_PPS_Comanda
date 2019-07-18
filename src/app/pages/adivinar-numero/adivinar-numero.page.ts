import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { MesasService } from 'src/app/services/mesas/mesas.service';

@Component({
  selector: 'app-adivinar-numero',
  templateUrl: './adivinar-numero.page.html',
  styleUrls: ['./adivinar-numero.page.scss'],
})
export class AdivinarNumeroPage implements OnInit {
  public currentUser: firebase.User;
  uidUsuario:any;
  public jugando: any;
  public vueltas: any;
  public i: any;
  public terminoJuego: any;
  public numeroRandom: any;
  public numeroJugador: any;
  public respuesta: any;
  public mensajeError: any;
  public mensajeExito: any;
  public esGanador: any;
  public esPerdedor: any;
  public mjeVueltas: any;
  mesas : any;
  codigomesa:any;

  /*
    1 inicio juego
      1.1 creo random y pido numero a persona

    2 ingreso numero
    3 valido numero ingresado contra el random
      3.1 si es exitoso salgo
      3.2 si no, sigo jugando
      3.2 valido que pueda seguir jugando

    4 salgo diciendo que perdio
  */
  constructor(private router: Router,public mesasService:MesasService) {
    // this.i = 1;
    // this.vueltas = 6;
    this.terminoJuego = false;
    this.esGanador = false;
    this.esPerdedor = false;
    this.terminoJuego = false;

    firebase.auth().onAuthStateChanged(user => {
 
      this.currentUser = user;
      this.uidUsuario = user.uid});
  }
  ionViewWillEnter(){
    alert(this.uidUsuario);
   this.mesasService.TraerMesas().subscribe(data => {

     this.mesas = data.map(e => {
       return {
         id: e.payload.doc.id,
         isEdit: false,
         codigo: e.payload.doc.data()['codigo'],
         estado: e.payload.doc.data()['estado'],
         tipo: e.payload.doc.data()['tipo'],
         cantPersonas: e.payload.doc.data()['cantPersonas'],
         cliente: e.payload.doc.data()['cliente'],
         monto: e.payload.doc.data()['monto'],
         propina: e.payload.doc.data()['propina'],
         descuento10: e.payload.doc.data()['descuento10'],
         descuentoBebida: e.payload.doc.data()['descuentoBebida'],
         descuentoPostre: e.payload.doc.data()['descuentoPostre'],
       };
     })
     console.log(this.mesas);
   });
  }

  ngOnInit() {
  }

  generarRandom() {
    // this.numeroRandom = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
    this.numeroRandom=    90;

  }

  iniciarJuego() {
    this.i = 1;
    this.vueltas = 6;
    this.terminoJuego = false;
    this.generarRandom();
    this.jugando = true;
    this.respuesta = 'Encuentra el numero entre 1 y 100.';
    this.mjeVueltas = 'Oportunidades: ' + this.vueltas;
  }

  validar() {

    if (isNaN(this.numeroJugador) || (this.numeroJugador > 100 || this.numeroJugador < 1)) {
      this.respuesta = 'Valor no valido';
      return;
    }

    if (this.vueltas > this.i) {
      // Sigo Jugando
      let numero = 0;
      if (this.numeroRandom < this.numeroJugador) {
        numero = this.numeroJugador - this.numeroRandom;
        if (numero > 10 ) {
          this.respuesta = 'Tu número es alto';
        } else {
          this.respuesta = 'Tu número es alto pero estas cerca.';
        }
      } else if (this.numeroRandom > this.numeroJugador) {
        numero = this.numeroRandom - this.numeroJugador;
        if (numero > 10 ) {
          this.respuesta = 'Tu número es bajo';
        } else {
          this.respuesta = 'Tu número es bajo pero estas cerca.';
        }
      } else {
        this.mensajeExito = 'Felicitaciones, ganaste.';
        this.esGanador = true;
        this.esPerdedor = false;
        this.jugando = false;
        this.terminoJuego = true;
        
    this.mesas.forEach(element => {//TRAE MESA DEL USUARIO
      if(element.cliente == this.uidUsuario)
      {
        this.codigomesa = element.id
      }
      
    });
    this.mesasService.AgregarDescBebida(this.codigomesa, true);

        setTimeout(() => {

          this.router.navigateByUrl('home');
        }, 2000);
      }
    } else {
      // Perdiste
      this.jugando = false;
      this.esPerdedor = true;
      this.esGanador = false;
      this.terminoJuego = true;
      this.mensajeError = 'Mala suerte, otra vez será.';
      setTimeout(() => {

        this.router.navigateByUrl('');
      }, 2000);
    }
    this.vueltas--;
    this.mjeVueltas = 'Oportunidades: ' + this.vueltas;
  }

  volverHome() {

  }
}
