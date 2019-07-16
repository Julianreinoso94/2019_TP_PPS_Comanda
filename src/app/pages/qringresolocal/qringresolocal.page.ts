import { Component, OnInit } from '@angular/core';
import { BarcodeScannerOptions,BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { EventService } from '../../services/event/event.service';

@Component({
  selector: 'app-qringresolocal',
  templateUrl: './qringresolocal.page.html',
  styleUrls: ['./qringresolocal.page.scss'],
})
export class QringresolocalPage implements OnInit {
  encodeData: any;
  scannedData: {};
  barcodeScannerOptions: BarcodeScannerOptions;
  constructor(
    private barcodeScanner: BarcodeScanner,
    private eventService: EventService
  ) {
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    }
  }

  ngOnInit() {
  }

  VerificarDisponibilidadMesa() {
  
   }

   // cargarQrIngreso(datos: any) {
   //
   //   let parsedData = datos.text.split('@');
   //   return (parsedData);
   //   // let nombrescan = parsedData[0].toString();
   //   // let apellido = parsedData[1].toString();
   //   // let dniscan: number = +parsedData[2];
   //
   // }

}
