import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../services/event/event.service';

@Component({
  selector: 'app-encuesta-graficos',
  templateUrl: './encuesta-graficos.page.html',
  styleUrls: ['./encuesta-graficos.page.scss'],
})
export class EncuestaGraficosPage implements OnInit {
  public encuestaList: Array<any>;
  constructor(private router: Router, private eventService: EventService) { }

  ngOnInit() {
    this.eventService
      .getEncuestatList()
      .get()
      .then(eventListSnapshot => {
        this.encuestaList = [];
        eventListSnapshot.forEach(snap => {
          this.encuestaList.push({
            id: snap.id,
            unidad: snap.data().unidad,
            select: snap.data().select,
            procentaje: snap.data().procentaje,
            cantidad: snap.data().cantidad,
            texto: snap.data().texto,
          });

          console.log(this.encuestaList);
          return false;
        });
      });
  }

}
