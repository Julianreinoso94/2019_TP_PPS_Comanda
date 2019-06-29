import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qrmesa',
  templateUrl: './qrmesa.page.html',
  styleUrls: ['./qrmesa.page.scss'],
})
export class QrmesaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  VerificarDisponibilidadMesa(idmesa)
  {
    // alert("entro a disponibilidad mesa");
  }

  VerificarEstadoDelPedido()
  {
    // alert("entro a estado del pedido");
  }

}
