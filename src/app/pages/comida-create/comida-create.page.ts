import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComidasService } from '../../services/comidas/comidas.service';
import { FotosService } from '../../services/fotos/fotos.service';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ModalController } from '@ionic/angular';
import * as firebase from 'firebase';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Storage } from '@ionic/storage';
import { Base64 } from '@ionic-native/base64/ngx';
//import { GaleriaPage } from '../galeria/galeria.page';
import { FormGroup } from '@angular/forms';

import {Tab1Page} from '../../tab1/tab1.page'
import {  ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-comida-create',
  templateUrl: './comida-create.page.html',
  styleUrls: ['./comida-create.page.scss'],
})
export class ComidaCreatePage implements OnInit {

  arrayLindas = [];
  loading = false;
  arrayFotosASubir = [];
  ref = firebase.database().ref('listaComida/');
  progressBar: boolean = false;
  arrayFotos = [];
  filePath2 = "sin foto";
  comidaName: string;
  comidaCodigo: string;

  idiomaSeleccionado:any;
array:any=[];

  options: CameraOptions = {
    quality: 10,
    //destinationType: this.camera.DestinationType.DATA_URL,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  constructor(
    private router: Router,private route: ActivatedRoute, private tabpag:Tab1Page,
    private comidaService: ComidasService,
    public fotoService: FotosService,
    private camera: Camera,
  
    private webview: WebView,
    private storage: Storage,
    private base64: Base64,
    public modalController: ModalController
  ) { }

  ngOnInit() {
    this.idiomaSeleccionado = this.route.snapshot.paramMap.get('id');
      
      switch(this.idiomaSeleccionado) { 
        case 'en': { 
          this.array= this.tabpag.arrayINGLES;
         break; 
        } 
        case 'rus': { 
           this.array= this.tabpag.arrayRusia;

           break; 
        } 
        case 'por': { 
          this.array= this.tabpag.arrayPor;

          break; 
       } 
       case'fr':{
         this.array=this.tabpag.arrayFra;

         break
       }
       case'esp':{
        this.array=this.tabpag.arrayEs;

        break
      }
  
      case'de':{
        this.array=this.tabpag.arrayDe;
        break
      } 
        default: { 
          this.array= this.tabpag.arrayEs;

           break; 
        } 
     } 
  }

  cargarComida(
    comidaCodigo:number,
    comidaName: string,
    comidaDescription: string,
    comidaPrice: number,
    comidaTime: number,
    tipo:string
  ): void {

    if (
      comidaCodigo == undefined||
      comidaName === undefined ||
      comidaDescription === undefined ||
      comidaPrice === undefined ||
      comidaTime === undefined || tipo == undefined
    ) {
      return;
    }
    this.loading = true;
    this.comidaService
      .crearComida(comidaCodigo,comidaName, comidaDescription, comidaPrice, comidaTime, tipo)
      .then(() => {
        this.router.navigateByUrl('comida-list');
        //this.fotoService.photos = [];
        this.loading = false;
      });
  }


  subirImagen(imagen){
    
    let filePath: string = imagen.path;
    this.filePath2 = imagen.path;
    
    this.base64.encodeFile(filePath).then((base64File: string) => {
        //console.log(base64File);
        imagen.imgbase64 = base64File;
        
        let newImg = this.ref.push();
        
        newImg.set(imagen);
        console.log("Se subio el archivo!");

      }, (err) => {
        console.log(err);
      });
        
  }

  subirFotos(array){
    this.progressBar = true;

    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      
      console.log(element);

      if(element.isChecked == true){
        
        console.log("el elemento.subido es:" ,element.subido);
        this.subirImagen(element);        
        element.subido = true;
        //array.splice(index, 1);
        console.log("el elemento.subido luego :" ,element.subido);
        console.log("llego al final del for para el elemento ", index+1);
      }
    }
    
    this.arrayFotos = array;

    this.arrayLindas = this.arrayFotos.filter((fotos) =>{
      return fotos.subido == false;
    })

    this.progressBar = false;
    //colocar ACA ALERT DE QUE SE SUBIERON OK!
  }


  sacarFoto(){
    
    var imagenTomada;
    var preview;
    var path;

    this.camera.getPicture(this.options).then((imageData) => {
      
        imagenTomada = 'data:image/jpeg;base64,' + imageData;
        path = imageData;
        preview = this.webview.convertFileSrc(imageData);
            
            this.arrayFotos.push({
              'imagen': imagenTomada,
              'imgbase64':'',
              'subido': false,
              'preview': preview,
              'path': path,
              'timestamp': Date(),
              'producto': this.comidaName,
              'productocod': this.comidaCodigo,
              isChecked:false
            });
          
            this.arrayLindas = this.arrayFotos.filter((fotos) =>{
              return fotos.subido == false;
            })         
          
      },(err) => {
          console.log("ERROR EN CAMARA ", JSON.stringify(err));
      }
    );
  }



}
