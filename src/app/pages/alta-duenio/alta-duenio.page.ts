import { Component, OnInit } from '@angular/core';

import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-alta-duenio',
  templateUrl: './alta-duenio.page.html',
  styleUrls: ['./alta-duenio.page.scss'],
})
export class AltaDuenioPage implements OnInit {
  students: any;
   nombre: string;
   apellido: number;
   dni: string;
   cuil:number
   foto:string;
   perfil:string;

   constructor(private crudService: CrudService) { }

   ngOnInit() {
     this.crudService.read_Students().subscribe(data => {

       this.students = data.map(e => {
         return {
           id: e.payload.doc.id,
           isEdit: false,
           nombre: e.payload.doc.data()['nombre'],
           apellido: e.payload.doc.data()['apellido'],
           dni: e.payload.doc.data()['dni'],
           cuil: e.payload.doc.data()['cuil'],
           foto: e.payload.doc.data()['foto'],
           perfil: e.payload.doc.data()['perfil'],

         };
       })
       console.log(this.students);

     });
   }

   CreateRecord() {
     let record = {};
     record['nombre'] = this.nombre;
     record['apellido'] = this.apellido;
     record['dni'] = this.dni;
     record['cuil'] = this.cuil;
     record['foto'] = this.foto;
     record['perfil'] = this.perfil;

     this.crudService.create_NewStudent(record).then(resp => {
       this.nombre = "";
       this.apellido = undefined;
       this.dni = "";
       this.cuil = "";
       this.foto = "";
       this.perfil = "";
       console.log(resp);
     })
       .catch(error => {
         console.log(error);
       });
   }

   RemoveRecord(rowID) {
     this.crudService.delete_Student(rowID);
   }

   EditRecord(record) {
     record.isEdit = true;
     record.EditName = record.nombre;
     record.EditAge = record.apellido;
     record.EditAddress = record.perfil;
   }

   UpdateRecord(recordRow) {
     let record = {};
     record['nombre'] = recordRow.EditName;
     record['apellido'] = recordRow.EditAge;
     record['dni'] = recordRow.EditAddress;
     record['cuil'] = recordRow.EditAddress;
     record['nombre'] = recordRow.EditAddress;
     record['perfil'] = recordRow.EditAddress;
     this.crudService.update_Student(recordRow.id, record);
     recordRow.isEdit = false;
   }


 }
