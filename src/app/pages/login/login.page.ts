import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from '../../services/user/auth.service';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;
  email:string;
  password:string;

  public loading: HTMLIonLoadingElement;
  constructor (
    public loadingCtrl: LoadingController,
    public actionSheetController: ActionSheetController,
    public alertCtrl: AlertController,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
      this.loginForm = this.formBuilder.group({
        email: ['',
          Validators.compose([Validators.required, Validators.email])],
        password: [
          '',
          Validators.compose([Validators.required, Validators.minLength(6)]),
        ],
      });
  }

  ngOnInit() {
  }

  async loginUser(loginForm: FormGroup): Promise<void> {
    if (!loginForm.valid) {
      console.log('Form is not valid yet, current value:', loginForm.value);
    } else {
      this.loading = await this.loadingCtrl.create();
      await this.loading.present();

      const email = loginForm.value.email;
      const password = loginForm.value.password;

      this.authService.loginUser(email, password).then(() => {
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
    }
  }

  async elegirusuario() {
   const actionSheet = await this.actionSheetController.create({
     header: 'Usuarios',
     buttons: [{
       text: 'Supervisor',
       role: 'destructive',
       handler: () => {
         this.email="julianreinoso94@gmail.com";
         this.password="123456";
         console.log('Delete clicked');
       }
     }, {
       text: 'Bartender',
       icon: 'share',
       handler: () => {
         this.email="bartender@bartender.com";
         this.password="123456";
         console.log('Share clicked');
       }
     }, {
       text: 'Cliente',
       icon: 'arrow-dropright-circle',
       handler: () => {
         this.email="cliente@cliente.com";
         this.password="123456";
         console.log('Play clicked');
       }
     }, {
       text: 'Anonimo',
       icon: 'heart',
       handler: () => {
         this.email="Anonimo@anonimo.com";
         this.password="123456";
         console.log('Favorite clicked');
       }
     },
     {
       text: 'Cocinero',
       icon: 'heart',
       handler: () => {
         this.email="cocinero@cocinero.com";
         this.password="123456";
         console.log('Favorite clicked');
       }
     },
     {
      text: 'Mozo',
      icon: 'heart',
      handler: () => {
        this.email="mozo@mozo.com";
        this.password="123456";
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

}
