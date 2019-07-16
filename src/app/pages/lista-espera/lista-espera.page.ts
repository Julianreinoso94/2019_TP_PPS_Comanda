import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event/event.service';
@Component({
  selector: 'app-lista-espera',
  templateUrl: './lista-espera.page.html',
  styleUrls: ['./lista-espera.page.scss'],
})
export class ListaEsperaPage implements OnInit {
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

  public listaEspera: Array<any>;
  constructor(private eventService: EventService) {}

  // ionViewDidLoad(){
  //     this.eventService
  //     .getListaEspera()
  //     .get()
  //     .then(listaEsperaSnapshot => {
  //       this.listaEspera = [];
  //       listaEsperaSnapshot.forEach(snap => {
  //         this.listaEspera.push({
  //           id: snap.id,
  //           uid: snap.data().uid,
  //           estado: snap.data().estado,
  //           status: snap.data().status,
  //         });
  //         return false;
  //       });
  //     });
  // }

}
