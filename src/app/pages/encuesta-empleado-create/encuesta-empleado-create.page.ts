import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../services/event/event.service';
import { FotosService } from '../../services/fotos/fotos.service';

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
  loading = false;
  alerta = false;

  constructor(
    private router: Router,
    private eventService: EventService,
    public fotoService: FotosService
  ) {}

  ngOnInit() {
  }

  apagar() {
    this.alerta = false;
  }
  /*
    Crear Encuesta de Empleado
  */
  crearEncuesta(
    unidad, select, procentaje, cantidad, texto
  ) {
    if (
      unidad === undefined ||
      select === undefined ||
      procentaje === undefined ||
      cantidad === undefined ||
      texto === undefined ||
      this.fotoService.fotoUnica === undefined
    ) {
        this.alerta = true;
        this.loading = false;
        return false;
    } else {
      this.loading = true;
      this.eventService
        .cargarEncuesta( unidad, select, procentaje, cantidad, texto, this.fotoService.fotoUnica )
        .then(() => {
          this.router.navigateByUrl('');
          this.fotoService.fotoUnica = null;
          this.loading = false;
        });
    }
  }
}
