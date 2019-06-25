import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../services/event/event.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FotosService } from '../../services/fotos/fotos.service';
import { AuthService } from '../../services/user/auth.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.page.html',
  styleUrls: ['./cliente-create.page.scss'],
})
export class ClienteCreatePage implements OnInit {

  public signupForm: FormGroup;
  public loading: any;

  public clienteName: string;
  public clienteLastname: string;
  public clienteDni: any;
  constructor(
    private router: Router,
    private eventService: EventService,
    public fotoService: FotosService,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder
  ) { 

    this.signupForm = this.formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required, Validators.email]),
      ],
      password: [
        '',
        Validators.compose([Validators.minLength(6), Validators.required]),
      ],
    });
  }



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
    // if (
    //   nombre === undefined ||
    //   this.fotoService.photos.length === 0
    // ) {
    //   return;
    // }

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
          this.router.navigateByUrl('login');
          this.fotoService.photos = [];
          this.loading = false;
        });
    } else {
      this.loading = true;
      this.eventService
        .cargarCliente(nombre, apellido, dni, this.fotoService.photos)
        .then(() => {
          this.router.navigateByUrl('home');
          this.fotoService.photos = [];
          this.loading = false;
        });
    }
   this.signupUser();

  }

  async signupUser(): Promise<void> {
   

      this.authService.signupUserCliente( this.clienteName+"@gmail.com", "123456","Cliente").then(
        () => {
          this.loading.dismiss().then(() => {
            this.router.navigateByUrl('home');
          });
        },
        error => {
          this.loading.dismiss().then(async () => {
            const alert = await this.alertCtrl.create({
              message: error.message,
              buttons: [{ text: 'Ok', role: 'cancel' }],
            });
            await alert.present();
          });
        }
      );
      this.loading = await this.loadingCtrl.create();
     // await this.loading.present();
    }

 
  

}
