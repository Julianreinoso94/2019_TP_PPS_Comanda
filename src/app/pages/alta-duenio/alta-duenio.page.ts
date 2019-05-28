import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Camera, CameraOptions, PictureSourceType } from "@ionic-native/camera/ngx";
import { BarcodeScanner, BarcodeScannerOptions } from "@ionic-native/barcode-scanner/ngx";
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import * as firebase from "firebase";

@Component({
  selector: 'app-alta-duenio',
  templateUrl: './alta-duenio.page.html',
  styleUrls: ['./alta-duenio.page.scss'],
})
export class AltaDuenioPage implements OnInit {
  // Datos Dueño/Sup
  formDueSup: FormGroup;
  nombre: string;
  apellido: string;
  DNI: number;
  CUIL: string;
  perfil: string;

  nombreCtrl;
  apellidoCtrl;
  DNICtrl;
  CUILCtrl;
  perfilCtrl;

  captureDataUrl: Array<string>;
  hayFotos: boolean = false;
  cantidadFotos: number = 0;
  datosEscaneados: any;
datos: any;
  constructor(  private camera: Camera,
    private scanner: BarcodeScanner,
    public toastController: ToastController,
private alertCtrl: AlertController) {
    this.formDueSup = new FormGroup({
      nombreCtrl: new FormControl('', Validators.required),
      apellidoCtrl: new FormControl('', Validators.required),
      DNICtrl: new FormControl('', Validators.required),
      CUILCtrl: new FormControl('', Validators.required),
      perfilCtrl: new FormControl('', Validators.required)
    });
    this.captureDataUrl = new Array<string>();
}

  ngOnInit() {
  }

}
