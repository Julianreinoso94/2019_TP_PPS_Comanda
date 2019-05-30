import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../services/event/event.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FotosService } from '../../services/fotos/fotos.service';
@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.page.html',
  styleUrls: ['./cliente-create.page.scss'],
})
export class ClienteCreatePage implements OnInit {
  private loading = false;

  public clienteName: string;
  public clienteLastname: string;
  public clienteDni: any;
  constructor(
    private router: Router,
    private eventService: EventService,
    public fotoService: FotosService
  ) { }

  ngOnInit() {
    this.clienteName = '';
    this.clienteLastname = '';
    this.clienteDni = '';
  }

  cargarCliente(
    nombre,
    apellido,
    dni
  ): void {

    if (
      nombre === undefined ||
      this.fotoService.photos.length === 0
    ) {
      return;
    }

    if (
      nombre === 'Anónimo' ||
      nombre === 'Anonimo' ||
      nombre === 'anónimo' ||
      nombre === 'anonimo'
    ) {
      this.loading = true;
      this.eventService
        .cargarCliente(nombre, apellido, dni, this.fotoService.photos)
        .then(() => {
          this.router.navigateByUrl('');
          this.fotoService.photos = [];
          this.loading = false;
        });
    } else {
      this.loading = true;
      this.eventService
        .cargarCliente(nombre, apellido, dni, this.fotoService.photos)
        .then(() => {
          this.router.navigateByUrl('');
          this.fotoService.photos = [];
          this.loading = false;
        });
    }

  }

}
