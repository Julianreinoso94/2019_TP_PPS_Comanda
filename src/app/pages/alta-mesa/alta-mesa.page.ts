import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MesasService } from '../../services/mesas/mesas.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FotosService } from '../../services/fotos/fotos.service';

@Component({
  selector: 'app-alta-mesa',
  templateUrl: './alta-mesa.page.html',
  styleUrls: ['./alta-mesa.page.scss'],
})
export class AltaMesaPage implements OnInit {

  public fotoMesa: string = null;
  loading = false;
  
  constructor(
    private router: Router,
    private mesasService: MesasService,
    // private camara: Camera,
    public fotoService: FotosService
  ) { }

  ngOnInit() {
  }

  cargarMesa(
    mesaId: number,
    mesaCantPersonas: number,
    mesaTipo: string,
    mesaEstado: string
  ): void {

    if (
      mesaId === undefined ||
      mesaCantPersonas === undefined ||
      mesaTipo === undefined ||
      mesaEstado === undefined
    ) {
      return;
    }
    this.loading = true;
    this.mesasService
      .crearMesa(mesaId, mesaCantPersonas, mesaTipo, mesaEstado, this.fotoService.photos)
      .then(() => {
        this.router.navigateByUrl('');
        this.fotoService.photos = [];
        this.loading = false;
      });
  }







}
