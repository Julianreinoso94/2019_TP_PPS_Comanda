import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event/event.service';
import { ActivatedRoute } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
// const { miCamara } = Camera;
@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})

export class EventDetailPage implements OnInit {
  public currentEvent: any = {};
  public guestName = '';
  public guestPicture: string = null;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private camara: Camera
  ) {}

  ngOnInit() {
    const eventId: string = this.route.snapshot.paramMap.get('id');
    this.eventService
      .getEventDetail(eventId)
      .get()
      .then(eventSnapshot => {
        this.currentEvent = eventSnapshot.data();
        this.currentEvent.id = eventSnapshot.id;
        // console.log(eventSnapshot.collection('guestList'));
      });
  }

  addGuest(guestName: string): void {
    this.eventService
      .addGuest(
        guestName,
        this.currentEvent.id,
        this.currentEvent.price,
        this.guestPicture
      )
      .then(() => {
        this.guestName = '';
        this.guestPicture = null;
      });
  }

  async takePicture(): Promise<void> {

    const options: CameraOptions = {
      quality: 60,
      // sourceType: this.camara.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camara.DestinationType.DATA_URL,
      encodingType: this.camara.EncodingType.PNG,
      mediaType: this.camara.MediaType.PICTURE,
      correctOrientation: true
    };

    try {
      await this.camara.getPicture(options).then((imageData) => {
         // imageData is either a base64 encoded string or a file URI
         // If it's base64 (DATA_URL):
         let base64Image = 'data:image/jpeg;base64,' + imageData;

         this.guestPicture = base64Image;

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
