import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../services/event/event.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FotosService } from '../../services/fotos/fotos.service';
import { AuthService } from '../../services/user/auth.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {EmpleadosService} from '../../services/empleados/empleados.service';
import { stringify } from '@angular/core/src/util';

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

  clientes : any;
  codigo:any;
 Codigouid:any;
 nombre:String;

  
   
  constructor(
    private router: Router,   private empleadosService: EmpleadosService,
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
    this.nombre=nombre;
   
      this.eventService
        .cargarCliente(nombre, apellido, dni, this.fotoService.photos)
        .then(() => {
          //this.router.navigateByUrl('home');
          this.fotoService.photos = [];
          this.loading = false;
        });

        alert(this.nombre)
        this.empleadosService.TraerClientePorNombre(this.nombre).subscribe(data => {
          
          this.clientes = data.map(e => {
            return {
              codigo: e.payload.doc.id,
              
              
            };
          })
        });
    
  
  } 

  Volver()
  {


    

    this.clientes.forEach(element => {
      this.codigo=element.codigo;

   });
   
   alert(this.codigo);
 
   
  let record = {};
  record['nombre'] = "";
  record['LastName']="";
  record['clienteDni']="";
  record['foto']="";
  record['perfil']="Cliente";
     this.signupUser(record);

  }

  async signupUser(record): Promise<void> {
   

      this.authService.signupUserCliente( this.clienteName+"@gmail.com", "123456","Cliente",record,this.codigo).then(
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

    // ModificarCliente($nombre)
    // {
    //   console.log("entro");
    
    //   return this.firestore.collection('Mesas', ref => ref.where('nombre', '>=', $nombre)
    //   .where('nombre', '<=', $nombre + '\uf8ff')).set
    //   .snapshotChanges();
    
    // }
  

}
