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
  public unidadCantidad: Array<any>;
  public porcentajeCantidad: Array<any>;

  lineChart: any;
  donaChart: any;
  barChart: any;
  percentChart: any;
  @ViewChild('lineCanvas') lineCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('barCanvas') barCanvas;
  @ViewChild('percentCanvas') percentCanvas;

  constructor(private router: Router, private eventService: EventService) {}

  ngOnInit() {
    this.selectCant = [];
    this.unidadCantidad = [];
    this.porcentajeCantidad = [];
    this.selectCant['impecable'] = 0;
    this.selectCant['limpio'] = 0;
    this.selectCant['normal'] = 0;
    this.selectCant['sucio'] = 0;
    this.selectCant['asqueroso'] = 0;

    this.unidadCantidad['mañana'] = 0;
    this.unidadCantidad['mediodia'] = 0;
    this.unidadCantidad['noche'] = 0;

    this.porcentajeCantidad['0'] = 0;
    this.porcentajeCantidad['10'] = 0;
    this.porcentajeCantidad['20'] = 0;
    this.porcentajeCantidad['30'] = 0;
    this.porcentajeCantidad['40'] = 0;
    this.porcentajeCantidad['50'] = 0;
    this.porcentajeCantidad['60'] = 0;
    this.porcentajeCantidad['70'] = 0;
    this.porcentajeCantidad['80'] = 0;
    this.porcentajeCantidad['90'] = 0;
    this.porcentajeCantidad['100'] = 0;

    this.eventService
      .getEncuestatList()
      .get()
      .then(eventListSnapshot => {
        this.encuestaList = [];

        eventListSnapshot.forEach(snap => {

          // Niveles de Limpieza
          this.cargarSelect(snap.data().select);

          // Turnos
          this.cargarUnidad(snap.data().unidad);

          // Porcentajes
          this.cargarPorcentaje(snap.data().porcentaje);

          this.encuestaList.push({
            id: snap.id,
            unidad: snap.data().unidad,
            select: snap.data().select,
            porcentaje: snap.data().porcentaje,
            cantidad: snap.data().cantidad,
            texto: snap.data().texto,
          });
          // return false;
        });
      });
  }

  cargarSelect(select) {
    this.selectCant[select] += 1;
  }

  cargarUnidad(unidad) {
    this.unidadCantidad[unidad] += 1;
  }

  cargarPorcentaje(porcentaje) {
    this.porcentajeCantidad[porcentaje] += 1;
  }

  Resultado(grafico) {
      if (grafico === 1) {
          this.doughnutCanvas.nativeElement.style.display = 'none';
          this.lineCanvas.nativeElement.style.display = 'inline';
          this.barCanvas.nativeElement.style.display = 'none';
          this.percentCanvas.nativeElement.style.display = 'none';
          this.mostrarGraficoLineas();
      }

      if (grafico === 2) {
          this.lineCanvas.nativeElement.style.display = 'none';
          this.doughnutCanvas.nativeElement.style.display = 'inline';
          this.barCanvas.nativeElement.style.display = 'none';
          this.percentCanvas.nativeElement.style.display = 'none';
          this.mostrarGraficoDona();
      }
      if (grafico === 3) {
          this.lineCanvas.nativeElement.style.display = 'none';
          this.doughnutCanvas.nativeElement.style.display = 'none';
          this.barCanvas.nativeElement.style.display = 'inline';
          this.percentCanvas.nativeElement.style.display = 'none';
          this.mostrarGraficoBarras();
      }
      if (grafico === 4 ){
          this.lineCanvas.nativeElement.style.display = 'none';
          this.doughnutCanvas.nativeElement.style.display = 'none';
          this.barCanvas.nativeElement.style.display = 'none';
          this.percentCanvas.nativeElement.style.display = 'inline';
          this.mostrarGraficoPorcentajes();
      }
  }


  mostrarGraficoLineas() {

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {

        type: 'line',
        data: {
            labels: ['Asqueroso', 'Sucio', 'Normal', 'Limpio', 'Impecable'],
            datasets: [
                {
                    label: 'Limpieza',
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
                label: 'Niveles',
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
                    // 'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    // "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ]
            }]
        }

    });
  }

  mostrarGraficoBarras() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Mañana', 'Mediodia', 'Noche'],
        datasets: [{
          label: 'Turnos',
          data: [
            this.unidadCantidad['mañana'],
            this.unidadCantidad['mediodia'],
            this.unidadCantidad['noche']
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            // 'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            // 'rgba(153, 102, 255, 0.2)',
            // 'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            // 'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            // 'rgba(153, 102, 255, 1)',
            // 'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  mostrarGraficoPorcentajes() {

    this.percentChart = new Chart(this.percentCanvas.nativeElement, {

        type: 'line',
        data: {
            labels: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100'],
            datasets: [
                {
                    label: 'Porcentaje',
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
                      this.porcentajeCantidad['0'],
                      this.porcentajeCantidad['10'],
                      this.porcentajeCantidad['20'],
                      this.porcentajeCantidad['30'],
                      this.porcentajeCantidad['40'],
                      this.porcentajeCantidad['50'],
                      this.porcentajeCantidad['60'],
                      this.porcentajeCantidad['70'],
                      this.porcentajeCantidad['80'],
                      this.porcentajeCantidad['90'],
                      this.porcentajeCantidad['100']
                    ],
                    spanGaps: false,
                }
            ]
        }
    });
  }
}
