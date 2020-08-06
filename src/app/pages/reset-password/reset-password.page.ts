import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/user/auth.service';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Tab1Page} from '../../tab1/tab1.page'
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  idiomaSeleccionado:any;
  array:any=[];


  public resetPasswordForm: FormGroup;
  constructor(  private route: ActivatedRoute, private tabpag:Tab1Page,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.resetPasswordForm = this.formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required, Validators.email]),
      ],
    });
  }

  ngOnInit() {
    this.idiomaSeleccionado = this.route.snapshot.paramMap.get('id');
    switch(this.idiomaSeleccionado) { 
      case 'en': { 
        this.array= "this.tabpag.arrayINGLES";
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
  }
  resetPassword(resetPasswordForm: FormGroup): void {
    if (!resetPasswordForm.valid) {
      console.log(
        'Form is not valid yet, current value:', resetPasswordForm.value
      );
    } else {
      const email: string = resetPasswordForm.value.email;
      this.authService.resetPassword(email).then(
        async () => {
          const alert = await this.alertCtrl.create({
            message: 'Check your email for a password reset link',
            buttons: [
              {
                text: 'Ok',
                role: 'cancel',
                handler: () => {
                  this.router.navigateByUrl('login');
                },
              },
            ],
          });
          await alert.present();
        },
        async error => {
          const errorAlert = await this.alertCtrl.create({
            message: error.message,
            buttons: [{ text: 'Ok', role: 'cancel' }],
          });
          await errorAlert.present();
        }
      );
    }
  }

}
