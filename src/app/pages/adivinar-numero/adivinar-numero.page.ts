import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adivinar-numero',
  templateUrl: './adivinar-numero.page.html',
  styleUrls: ['./adivinar-numero.page.scss'],
})
export class AdivinarNumeroPage implements OnInit {

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
  constructor(private router: Router) {
    // this.i = 1;
    // this.vueltas = 6;
    this.terminoJuego = false;
    this.esGanador = false;
    this.esPerdedor = false;
    this.terminoJuego = false;

  }

  ngOnInit() {
  }

  generarRandom() {
    this.numeroRandom = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
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
        setTimeout(() => {

          this.router.navigateByUrl('');
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
