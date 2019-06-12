import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
class Photo {
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class FotosService {
  public photos: Photo[] = [];
  public fotoUnica: string = null;
  constructor(  private camara: Camera ) { }

  async takePicture(): Promise<void> {

    const options: CameraOptions = {
      quality: 15,
      // sourceType: this.camara.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camara.DestinationType.DATA_URL,
      encodingType: this.camara.EncodingType.PNG,
      mediaType: this.camara.MediaType.PICTURE,
      correctOrientation: false
    };

    try {
      await this.camara.getPicture(options).then((imageData) => {
         // imageData is either a base64 encoded string or a file URI
         // If it's base64 (DATA_URL):
         const base64Image = 'data:image/jpeg;base64,' + imageData;

         // Add new photo to gallery
         if (this.photos.length < 3) {
           this.photos.unshift({
               data: base64Image
           });
         }


        }, (err) => {
         // Handle error
         console.error(err);
        });
    } catch (error) {
       console.error(error);
    }
  }

  /*
    Toma una sola foto
  */
  async tomarFoto(): Promise<void> {

    const options: CameraOptions = {
      quality: 5,
      // sourceType: this.camara.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camara.DestinationType.DATA_URL,
      encodingType: this.camara.EncodingType.PNG,
      mediaType: this.camara.MediaType.PICTURE,
      correctOrientation: false
    };

    try {
      await this.camara.getPicture(options).then((imageData) => {
         // imageData is either a base64 encoded string or a file URI
         // If it's base64 (DATA_URL):
         const base64Image = 'data:image/jpeg;base64,' + imageData;

         this.fotoUnica = base64Image;

        }, (err) => {
         // Handle error
         alert(err);
         console.error(err);
        });
    } catch (error) {
       alert(error);
       console.error(error);
    }
  }

}
