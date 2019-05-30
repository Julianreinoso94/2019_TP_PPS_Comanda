import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event/event.service';
import { ActivatedRoute } from '@angular/router';
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


}
