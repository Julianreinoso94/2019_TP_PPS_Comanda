import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../services/event/event.service';

@Component({
  selector: 'app-encuesta-empleado-create',
  templateUrl: './encuesta-empleado-create.page.html',
  styleUrls: ['./encuesta-empleado-create.page.scss'],
})
export class EncuestaEmpleadoCreatePage implements OnInit {

  public cantidad: any;
  public select: any;
  public porcentaje: any;
  public texto: any;

  constructor(private router: Router, private eventService: EventService) {}

  ngOnInit() {
  }

  createEvent(
    eventName: string,
    eventDate: string,
    eventPrice: number,
    eventCost: number
  ): void {
    if (
      eventName === undefined ||
      eventDate === undefined ||
      eventPrice === undefined ||
      eventCost === undefined
    ) {
      return;
    }
    this.eventService
      .createEvent(eventName, eventDate, eventPrice, eventCost)
      .then(() => {
        this.router.navigateByUrl('');
      });
  }

}
