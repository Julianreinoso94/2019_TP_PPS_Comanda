import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qrpropina',
  templateUrl: './qrpropina.page.html',
  styleUrls: ['./qrpropina.page.scss'],
})
export class QrpropinaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  //INGRESO COMO CLIENTE, TOMO EL ID DEL AUTENTICACION ,
  //2. HACER CONSULTA DE MESA QUE TRAIGA LA MESA QUE ESTA OCUPANDO EL CLIENTE.
  // TRAER EL MONTO DE ESA MESA
  //CALCULAR EL PORCENTAJE SEGUN ESE MONTO Y MOSTRAR CARTEL CON PORCENTAJE DE PROPINA
  //cONSULTA QUE MODIFIQUE EL CAMPO PROPINA DE LA MESA SUBIENDO EL VALOR
//CUANDO SE CIERRA LA MESA QUE QUEDE EN CERO EL VALOR

  excelente()
  {
    //25%
    alert("Excelente");
  }

  muyBueno()
  {
    //20%
    alert("muyBueno");
  }

  Bueno()
  {
    //15%
    alert("bueno");
  }

  Regular()
  {
    //10%
    alert("Regular");
  }
  Malo(){
    //5%
    alert("Malo");
  }

}
