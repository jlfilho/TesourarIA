import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-central-cash-limits-chart',
  standalone: true,
  imports: [CommonModule, NgxChartsModule, MatCardModule],
  templateUrl: './central-cash-limits-chart.component.html',
  styleUrls: ['./central-cash-limits-chart.component.scss']
})
export class CentralCashLimitsChartComponent implements OnInit {
  centralStock = [
    { day: 1, stock: 480, min: 300, max: 700 },
    { day: 2, stock: 520, min: 300, max: 700 },
    { day: 3, stock: 290, min: 300, max: 700 },
    { day: 4, stock: 680, min: 300, max: 700 },
    { day: 5, stock: 750, min: 300, max: 700 }
  ];

  chartData: any[] = [];
  alerts: { type: string; message: string }[] = [];

  colorScheme: any = {
    domain: ['#2563eb', '#dc2626', '#16a34a'] // azul, vermelho, verde
  };

  view: [number, number] = [1000, 400];

  ngOnInit() {
    this.updateChartData();
    this.generateAlerts();
  }

  private updateChartData(): void {
    this.chartData = [
      {
        name: 'Estoque da Central',
        series: this.centralStock.map(d => ({ 
          name: `Dia ${d.day}`, 
          value: d.stock 
        }))
      },
      {
        name: 'Limite Mínimo',
        series: this.centralStock.map(d => ({ 
          name: `Dia ${d.day}`, 
          value: d.min 
        }))
      },
      {
        name: 'Limite Máximo',
        series: this.centralStock.map(d => ({ 
          name: `Dia ${d.day}`, 
          value: d.max 
        }))
      }
    ];
  }

  generateAlerts() {
    this.alerts = [];
    this.centralStock.forEach(d => {
      if (d.stock < d.min) {
        this.alerts.push({ 
          type: 'low', 
          message: `Dia ${d.day}: abaixo do limite mínimo (R$ ${d.min.toLocaleString('pt-BR')} mil). Saldo: R$ ${d.stock.toLocaleString('pt-BR')} mil.` 
        });
      } else if (d.stock > d.max) {
        this.alerts.push({ 
          type: 'high', 
          message: `Dia ${d.day}: acima do limite máximo (R$ ${d.max.toLocaleString('pt-BR')} mil). Saldo: R$ ${d.stock.toLocaleString('pt-BR')} mil.` 
        });
      }
    });
  }
}

