import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComidasService } from '../../services/comidas/comidas.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FotosService } from '../../services/fotos/fotos.service';

@Component({
  selector: 'app-comida-create',
  templateUrl: './comida-create.page.html',
  styleUrls: ['./comida-create.page.scss'],
})
export class ComidaCreatePage implements OnInit {

  public fotoComida: string = null;
  loading = false;
  constructor(
    private router: Router,
    private comidaService: ComidasService,
    // private camara: Camera,
    public fotoService: FotosService
  ) { }

  ngOnInit() {
  }

  cargarComida(
    comidaName: string,
    comidaDescription: string,
    comidaPrice: number,
    comidaTime: number
  ): void {

    if (
      comidaName === undefined ||
      comidaDescription === undefined ||
      comidaPrice === undefined ||
      comidaTime === undefined
    ) {
      return;
    }
    this.loading = true;
    this.comidaService
      .crearComida(comidaName, comidaDescription, comidaPrice, comidaTime, this.fotoService.photos)
      .then(() => {
        this.router.navigateByUrl('');
        this.fotoService.photos = [];
        this.loading = false;
      });
  }

  // async takePicture(): Promise<void> {
  //
  //   const options: CameraOptions = {
  //     quality: 60,
  //     // sourceType: this.camara.PictureSourceType.PHOTOLIBRARY,
  //     destinationType: this.camara.DestinationType.DATA_URL,
  //     encodingType: this.camara.EncodingType.PNG,
  //     mediaType: this.camara.MediaType.PICTURE,
  //     correctOrientation: true
  //   };
  //
  //   try {
  //     await this.camara.getPicture(options).then((imageData) => {
  //        // imageData is either a base64 encoded string or a file URI
  //        // If it's base64 (DATA_URL):
  //        let base64Image = 'data:image/jpeg;base64,' + imageData;
  //
  //        // Add new photo to gallery
  //        this.photos.unshift({
  //            data: base64Image
  //        });
  //
  //        this.fotoComida = base64Image;
  //
  //       }, (err) => {
  //        // Handle error
  //        alert(err);
  //        console.error(err);
  //       });
  //   } catch (error) {
  //      alert(error);
  //      console.error(error);
  //   }
  // }

}
