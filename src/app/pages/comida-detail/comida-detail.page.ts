import { Component, OnInit } from '@angular/core';
import { ComidasService } from '../../services/comidas/comidas.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-comida-detail',
  templateUrl: './comida-detail.page.html',
  styleUrls: ['./comida-detail.page.scss'],
})
export class ComidaDetailPage implements OnInit {
  public comidaActual: any = {};
  constructor(
    private comidaService: ComidasService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    const comidaId: string = this.route.snapshot.paramMap.get('id');
    this.comidaService
      .getDetalleComida(comidaId)
      .get()
      .then(eventSnapshot => {
        this.comidaActual = eventSnapshot.data();
        this.comidaActual.id = eventSnapshot.id;
      });
  }

}
