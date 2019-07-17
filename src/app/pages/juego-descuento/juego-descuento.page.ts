import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { MesasService } from 'src/app/services/mesas/mesas.service';
import { Router } from '@angular/router';
// import { EventService } from '../services/event/event.service';
@Component({
  selector: 'app-juego-descuento',
  templateUrl: './juego-descuento.page.html',
  styleUrls: ['./juego-descuento.page.scss'],
})
export class JuegoDescuentoPage implements OnInit {
  public currentUser: firebase.User;
  uidUsuario:any;

    // Definimos las variables
    letra: string = '';
    nombres: any = [ 'VINO'];
    nombreSecreto: any = this.palabraAleatoria(0, (this.nombres.length - 1));
    palabra: any = '';
    muestraHuecos: any = this.muestraHuecosPalabra();
    mensaje: string = 'Selecciona una letra del listado.';
    vidas: number = 5;
    puntos: number = 0;
    ganador: number = 0;
    codigo: "";
    valor: boolean = true;
    recordMesa: any;
    mesas : any;
    codigoMesa:any;
  
    // Creamos un array para guardar las letras que se van seleccionando.
    controlLetras = new Array;
  
    constructor(public navCtrl: NavController,private router: Router, private mesasService: MesasService) {  

      firebase.auth().onAuthStateChanged(user => {
 
        this.currentUser = user;
        this.uidUsuario = user.uid});
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
  
    // Método que genera una palabra aleatoria comprendida en el array nombres.	
    public palabraAleatoria(primer, ultimo) {
      let numberOfName = Math.round(Math.random() * (ultimo - primer) + (primer));
      return this.nombres[numberOfName];
    }
  
    // Método que valida la letra seleccionada.	
    public compruebaLetra() {

      {
      // Formateamos a mayúsculas para mejorar la legibilidad.
      let letraMayusculas = this.letra.toUpperCase();
      
      // Si se ha seleccionado una letra...		
      if (letraMayusculas) {
  
          if (this.nombreSecreto.indexOf(letraMayusculas) != -1) {
  
            let nombreSecretoModificado = this.nombreSecreto;
            let posicion = new Array;
            let posicionTotal = 0;
  
            let contador = 1;
            while (nombreSecretoModificado.indexOf(letraMayusculas) != -1) {
                
              posicion[contador] = nombreSecretoModificado.indexOf(letraMayusculas);
              nombreSecretoModificado = nombreSecretoModificado.substring(nombreSecretoModificado.indexOf(letraMayusculas) + letraMayusculas.length, nombreSecretoModificado.length);
  
              // Calculamos la posición total.
              if (contador > 1) {
                posicionTotal = posicionTotal + posicion[contador] + 1;
              }
              else { 
                posicionTotal = posicionTotal + posicion[contador];
              }
  
              this.palabra[posicionTotal] = letraMayusculas;
              this.mensaje = 'Genial, la letra ' + letraMayusculas + ' está en la palabra secreta.';
  
              // Sumamos puntos
              if (this.controlLetras.indexOf(letraMayusculas) == -1) {
                  this.puntos = this.puntos + 10;
              }
              else { 
                  this.mensaje = 'La letra ' + letraMayusculas + ' fue seleccionada anteriormente.';
              }
  
              contador++;
            }
  
            // Si ya no quedan huecos, mustramos el mensaje para el ganador.
            if (this.palabra.indexOf('_') == -1) { 
  
              // Sumamos puntos
              if (this.controlLetras.indexOf(letraMayusculas) == -1) {
                this.puntos = this.puntos + 50;
              }
  
              // Damos el juego por finalizado, el jugador gana.
              this.finDelJuego('gana')					
            }
          }
        else {
          // Restamos una vida.
          this.nuevoFallo();
  
          // Comprobamos si nos queda alguna vida.
          if (this.vidas > 0) {
            
            // Restamos puntos siempre y cuando no sean 0.
            if (this.puntos > 0) { 
              if (this.controlLetras.indexOf(letraMayusculas) == -1) {
                this.puntos = this.puntos - 5;
              }
            }
  
            // Mostramos un mensaje indicando el fallo.					
            this.mensaje = 'Fallo, la letra ' + letraMayusculas + ' no está en la palabra secreta, recuerda que te quedan ' + this.vidas + ' vidas.';
          }
          else { 
            // Damos el juego por finalizado, el jugador pierde.
            this.finDelJuego('pierde')
          }
        }
  
        // La añadimos al array de letras seleccionadas.
        this.controlLetras.push(letraMayusculas);
  
      }
      else {
        this.mensaje = 'Seleccione una letra del listado.';
      }
    }
   
    }
  
    public muestraHuecosPalabra() {
      let totalHuecos = this.nombreSecreto.length;
      
      console.log(totalHuecos);
      // Declaramos la variable huecos como nuevo array.		
      let huecos = new Array;
      for (let i = 0; i < totalHuecos; i++) {
        //Asignamos tantos huecos como letras tenga la palabra.
        huecos.push('_');
      }
  
      // Para empezar formamos la variable palabra tan solo con los huecos, ya que en este momento aún no se ha seleccionado ninguna letra.	
      this.palabra = huecos;
      console.log(this.palabra);
      return this.palabra;
    }
  
    public nuevoFallo() {
      this.vidas = this.vidas - 1;
      return this.vidas;
    }
  
    public finDelJuego(valor) { 
      // Perdedor
      if (valor == 'pierde') { 
        // Mostramos el mensaje como que el juego ha terminado
        //this.mensaje = 'Perdiste!, Inténtalo de nuevo. Has conseguido un total de ' + this.puntos + ' puntos. La palabra secreta es ' + this.nombreSecreto;
        this.mensaje = 'Perdiste!. La próxima será..'
      
      }
  
      // Ganador
      if (valor == 'gana') { 
        this.mesas.forEach(element => {////////////////////SI EL CLIENTE ESTA SENTADO EN ALGUNA MESA
          if (element.cliente == this.uidUsuario)
          { 
            this.codigoMesa=element.id;
            
          }
          
        });
        this.mensaje = 'Enhorabuena!, Has acertado la palabra secreta. Has conseguido un 10% de descuento en tu cuenta.';
        this.ganador = 1;
//        console.log("codigo mesa:" + this.codigo);
        console.log("codigo" + this.codigoMesa);
        
        //console.log(this.mesasService.TraerMesaPorCodigo(this.codigo));
        this.mesasService.AgregarDesc10(this.codigoMesa, this.valor);
        this.router.navigateByUrl('home');

        this

      }		
    }
  
    public reiniciaJuego() { 
      this.letra = '';
      this.palabra = '';
      this.vidas = 5;
      this.mensaje = '';
      this.ganador = 0;
      this.puntos = 0;
      this.nombreSecreto = this.palabraAleatoria(0, (this.nombres.length-1));
      this.muestraHuecos = this.muestraHuecosPalabra();
  }

  ngOnInit() {
  }


  

}