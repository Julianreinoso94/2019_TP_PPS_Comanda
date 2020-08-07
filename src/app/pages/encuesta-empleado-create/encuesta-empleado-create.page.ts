import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../services/event/event.service';
import { FotosService } from '../../services/fotos/fotos.service';
import {Tab1Page} from '../../tab1/tab1.page'
import {  ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-encuesta-empleado-create',
  templateUrl: './encuesta-empleado-create.page.html',
  styleUrls: ['./encuesta-empleado-create.page.scss'],
})
export class EncuestaEmpleadoCreatePage implements OnInit {

  loading = false;
  alerta = false;
  idiomaSeleccionado:any;
   array:any=[];

  constructor(
    private router: Router,   private route: ActivatedRoute, private tabpag:Tab1Page,
    private eventService: EventService,
    public fotoService: FotosService
  ) {}

  ngOnInit() {
    this.idiomaSeleccionado = this.route.snapshot.paramMap.get('id');
      
      switch(this.idiomaSeleccionado) { 
        case 'en': { 
          this.array= this.tabpag.arrayINGLES;
         break; 
        } 
        case 'rus': { 
           this.array= this.tabpag.arrayRusia;

           break; 
        } 
        case 'por': { 
          this.array= this.tabpag.arrayPor;

          break; 
       } 
       case'fr':{
         this.array=this.tabpag.arrayFra;

         break
       }
       case'esp':{
        this.array=this.tabpag.arrayEs;

        break
      }
  
      case'de':{
        this.array=this.tabpag.arrayDe;
        break
      } 
        default: { 
          this.array= this.tabpag.arrayEs;

           break; 
        } 
     } 
    this.fotoService.fotoUnica = null;
  }

  apagar() {
    this.alerta = false;
  }
  /*
    Crear Encuesta de Empleado
  */
  crearEncuesta(
    unidad, select, porcentaje, cantidad, texto
  ) {
    if (
      unidad === undefined ||
      select === undefined ||
      porcentaje === undefined ||
      cantidad === undefined ||
      texto === undefined ||
      this.fotoService.fotoUnica === null
    ) {
        this.alerta = true;
        this.loading = false;
        return false;
    } else {
      this.loading = true;
      this.eventService
        .cargarEncuesta( unidad, select, porcentaje, cantidad, texto, this.fotoService.fotoUnica )
        .then(() => {
          this.router.navigateByUrl('');
          this.fotoService.fotoUnica = null;
          this.loading = false;
        });
    }
  }
}
