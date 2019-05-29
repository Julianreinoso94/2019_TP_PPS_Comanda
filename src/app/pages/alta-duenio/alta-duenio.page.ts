import { Component, OnInit } from '@angular/core';

import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-alta-duenio',
  templateUrl: './alta-duenio.page.html',
  styleUrls: ['./alta-duenio.page.scss'],
})
export class AltaDuenioPage implements OnInit {
  students: any;
   studentName: string;
   studentAge: number;
   studentAddress: string;

   constructor(private crudService: CrudService) { }

   ngOnInit() {
     this.crudService.read_Students().subscribe(data => {

       this.students = data.map(e => {
         return {
           id: e.payload.doc.id,
           isEdit: false,
           Name: e.payload.doc.data()['Name'],
           Age: e.payload.doc.data()['Age'],
           Address: e.payload.doc.data()['Address'],
         };
       })
       console.log(this.students);

     });
   }

   CreateRecord() {
     let record = {};
     record['Name'] = this.studentName;
     record['Age'] = this.studentAge;
     record['Address'] = this.studentAddress;
     this.crudService.create_NewStudent(record).then(resp => {
       this.studentName = "";
       this.studentAge = undefined;
       this.studentAddress = "";
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
     record.EditName = record.Name;
     record.EditAge = record.Age;
     record.EditAddress = record.Address;
   }

   UpdateRecord(recordRow) {
     let record = {};
     record['Name'] = recordRow.EditName;
     record['Age'] = recordRow.EditAge;
     record['Address'] = recordRow.EditAddress;
     this.crudService.update_Student(recordRow.id, record);
     recordRow.isEdit = false;
   }


 }
