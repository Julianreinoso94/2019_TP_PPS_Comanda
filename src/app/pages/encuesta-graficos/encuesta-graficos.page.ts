import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../services/event/event.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-encuesta-graficos',
  templateUrl: './encuesta-graficos.page.html',
  styleUrls: ['./encuesta-graficos.page.scss'],
})
export class EncuestaGraficosPage implements OnInit {

  public encuestaList: Array<any>;
  public selectList: Array<any>;
  public selectCant: Array<any>;
  lineChart: any;
  donaChart: any;
  @ViewChild('lineCanvas') lineCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;

  constructor(private router: Router, private eventService: EventService) {}

  ngOnInit() {
    this.selectCant = [];
    this.selectCant['impecable'] = 0;
    this.selectCant['limpio'] = 0;
    this.selectCant['normal'] = 0;
    this.selectCant['sucio'] = 0;
    this.selectCant['asqueroso'] = 0;

    this.eventService
      .getEncuestatList()
      .get()
      .then(eventListSnapshot => {
        this.encuestaList = [];

        eventListSnapshot.forEach(snap => {

          this.cargarSelect(snap.data().select);

          this.encuestaList.push({
            id: snap.id,
            unidad: snap.data().unidad,
            select: snap.data().select,
            procentaje: snap.data().procentaje,
            cantidad: snap.data().cantidad,
            texto: snap.data().texto,
          });
          // return false;
        });
      });

  }

  cargarSelect(select) {

    switch (select)
    {
    case'impecable':

      this.selectCant['impecable'] += 1;
      break;
    case'limpio':

      this.selectCant['limpio'] += 1;
      break;
    case'normal':

      this.selectCant['normal'] += 1;
      break;
    case'sucio':

      this.selectCant['sucio'] += 1;
      break;
    case'asqueroso':

      this.selectCant['asqueroso'] += 1;
      break;
    default:
      alert("Wrong Grade.........");
    }
  }

  Resultado(grafico) {
      if (grafico === 1) {
          this.mostrarGraficoLineas();
      }
      if (grafico === 2) {
          this.mostrarGraficoDona();
      }
  }


  mostrarGraficoLineas() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {

        type: 'line',
        data: {
            labels: ['Asqueroso', 'Sucio', 'Normal', 'Limpio', 'Impecable'],
            datasets: [
                {
                    label: 'My First dataset',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [
                      this.selectCant['asqueroso'],
                      this.selectCant['sucio'],
                      this.selectCant['normal'],
                      this.selectCant['limpio'],
                      this.selectCant['impecable']
                    ],
                    spanGaps: false,
                }
            ]
        }
    });
  }

  mostrarGraficoDona() {
    this.donaChart = new Chart(this.doughnutCanvas.nativeElement, {

        type: 'doughnut',
        data: {
            labels: ['Asqueroso', 'Sucio', 'Normal', 'Limpio', 'Impecable'],
            datasets: [{
                label: '# of Votes',
                data: [
                  this.selectCant['asqueroso'],
                  this.selectCant['sucio'],
                  this.selectCant['normal'],
                  this.selectCant['limpio'],
                  this.selectCant['impecable']
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ]
            }]
        }

    });
  }
}
