import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from '../../services/user/auth.service';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { ClienteService } from 'src/app/services/clientes/cliente.service';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { ModalController, PopoverController } from '@ionic/angular'
import { LenguajePopoverPage } from 'src/app/lenguaje-popover/lenguaje-popover.page';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;
  email: string;
  password: string;
  clientes: any;
  verificado: boolean = true;
  idiomaSeleccionado$: Observable<string>;

  idioma: any;

  lng = [
    {
      img: "assets/paises/esp.png",
      text: 'ESP'


    }
  ];


  public loading: HTMLIonLoadingElement;
  constructor(
    public loadingCtrl: LoadingController, public popoverCtrl: PopoverController,
    public actionSheetController: ActionSheetController,
    public alertCtrl: AlertController,
    private authService: AuthService,
    public router: Router,
    private formBuilder: FormBuilder,
    private firestore: AngularFirestore,
    private clienteService: ClienteService, private actRoute: ActivatedRoute,
    public toastCtrl: ToastController, private http: HttpClient, public translate: TranslateService

  ) {
    this.loginForm = this.formBuilder.group({
      email: ['',
        Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
    });

    this.idiomaSeleccionado$ = this.actRoute.snapshot.params.id;

    translate.addLangs(['en', 'nl']);
    translate.setDefaultLang('en');
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }

  ngOnInit() {
    this.clienteService.TraerClientes().subscribe(data => {

      this.clientes = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          email: e.payload.doc.data()['email'],

        };
      })
      //console.log(this.clientes);
    });



  }

  // CreatePopover() {
  //   this.popoverCtrl.create({
  //     component: LenguajePopoverPage,
  //     showBackdrop: false
  //   }).then((popoverElement) => {
  //     popoverElement.present();
  //   })
  // }

  async loginUser(loginForm: FormGroup): Promise<void> {


    if (!loginForm.valid) {
      console.log('Form is not valid yet, current value:', loginForm.value);
    }
    else {
      this.loading = await this.loadingCtrl.create();
      await this.loading.present();

      const email = loginForm.value.email;
      const password = loginForm.value.password;
      let verificadoo = true;

      this.clientes.forEach(function (value) {
        if (value.email == email) {
          console.log("Email" + value.email);

          firebase.auth().onAuthStateChanged(function (user) {
            var email = user.email;
            console.log("entromail" + email);
            console.log("verificado=" + user.emailVerified);

            if (user.emailVerified == false) {
              console.log("no verificado!");
              //this.router.navigate(['/login']);
              verificadoo = false;
              console.log("guardo" + verificadoo);

            }

          });

        }
      });

      this.authService.loginUser(email, password).then(() => {
        this.loading.dismiss().then(() => {

          console.log("verif" + verificadoo);

          if (verificadoo == true) {

            this.router.navigateByUrl('home');
          }
          else {
            this.router.navigateByUrl('login');
            this.mostrarToast("Pendiente de activación. Revise su mail o vuelva a ingresar", "Danger Toast");
          }
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
    }

  }



  async elegirusuario() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Usuarios',
      buttons: [{
        text: 'Supervisor',
        role: 'destructive',
        handler: () => {
          this.email = "julianreinoso94@gmail.com";
          this.password = "123456";
          console.log('Delete clicked');
        }
      },
      {
        text: 'Delivery',
        role: 'destructive',
        handler: () => {
          this.email = "delivery@gmail.com";
          this.password = "123456";
          console.log('Delete clicked');
        }
      },
      {
        text: 'Bartender',
        handler: () => {
          this.email = "bartender@bartender.com";
          this.password = "123456";
          console.log('Share clicked');
        }
      }, {
        text: 'Cliente',
        handler: () => {
          this.email = "cliente@cliente.com";
          this.password = "123456";
          console.log('Play clicked');
        }
      }, {
        text: 'Cliente2',
        handler: () => {
          this.email = "mario@gmail.com";
          this.password = "123456";
          console.log('Favorite clicked');
        }
      }, {
        text: 'Anonimo',
        handler: () => {
          this.email = "Anonimo@anonimo.com";
          this.password = "123456";
          console.log('Favorite clicked');
        }
      },
      {
        text: 'Cocinero',
        handler: () => {
          this.email = "cocinero@cocinero.com";
          this.password = "123456";
          console.log('Favorite clicked');
        }
      },
      {
        text: 'Mozo',
        handler: () => {
          this.email = "mozo@mozo.com";
          this.password = "123456";
          console.log('Favorite clicked');
        }
      },

      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {

          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }



  public async mostrarToast(miMsj: string, color: string) {
    let toast = await this.toastCtrl.create({
      showCloseButton: true,
      closeButtonText: "cerrar",
      cssClass: color,
      message: miMsj,
      duration: 3000,
      position: 'top'
    });
    return await toast.present();
  }






}
