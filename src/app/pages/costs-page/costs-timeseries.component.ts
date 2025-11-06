import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CostRecord } from '../../core/models/cost-record.model';

@Component({
  selector: 'app-costs-timeseries',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    NgxChartsModule
  ],
  templateUrl: './costs-timeseries.component.html',
  styleUrls: ['./costs-timeseries.component.scss']
})
export class CostsTimeseriesComponent implements OnInit, OnChanges {
  @Input() data: CostRecord[] = [];

  // TODO: integrar com API de custos reais
  private mockData: CostRecord[] = [
    { date: '2025-10-01', fixedCost: 8000, variableCost: 4000, totalCost: 12000 },
    { date: '2025-10-02', fixedCost: 8000, variableCost: 7000, totalCost: 15000 },
    { date: '2025-10-03', fixedCost: 8000, variableCost: 10000, totalCost: 18000 },
    { date: '2025-10-04', fixedCost: 8000, variableCost: 6000, totalCost: 14000 },
    { date: '2025-10-05', fixedCost: 8000, variableCost: 5000, totalCost: 13000 },
    { date: '2025-10-06', fixedCost: 8000, variableCost: 11000, totalCost: 19000 },
    { date: '2025-10-07', fixedCost: 8000, variableCost: 9000, totalCost: 17000 },
    { date: '2025-10-08', fixedCost: 8000, variableCost: 12000, totalCost: 20000 },
    { date: '2025-10-09', fixedCost: 8000, variableCost: 8500, totalCost: 16500 },
    { date: '2025-10-10', fixedCost: 8000, variableCost: 7500, totalCost: 15500 },
    { date: '2025-10-11', fixedCost: 8000, variableCost: 9500, totalCost: 17500 },
    { date: '2025-10-12', fixedCost: 8000, variableCost: 10500, totalCost: 18500 },
    { date: '2025-10-13', fixedCost: 8000, variableCost: 5500, totalCost: 13500 },
    { date: '2025-10-14', fixedCost: 8000, variableCost: 6500, totalCost: 14500 }
  ];

  chartData: any[] = [];
  colorScheme: any = {
    domain: ['#2563eb', '#22c55e', '#f97316'] // azul, verde, laranja
  };

  // View responsiva para o gráfico
  view: [number, number] = [1000, 400];

  ngOnInit(): void {
    // Se não recebeu dados via @Input, usa mock
    if (!this.data || this.data.length === 0) {
      this.data = this.mockData;
    }
    this.updateChartData();
  }

  ngOnChanges(): void {
    if (this.data && this.data.length > 0) {
      this.updateChartData();
    }
  }

  private updateChartData(): void {
    // Formatar datas para exibição (DD/MM)
    const formatDate = (dateStr: string): string => {
      const date = new Date(dateStr);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      return `${day}/${month}`;
    };

    this.chartData = [
      {
        name: 'Custo Total',
        series: this.data.map(d => ({
          name: formatDate(d.date),
          value: d.totalCost
        }))
      },
      {
        name: 'Custo Fixo',
        series: this.data.map(d => ({
          name: formatDate(d.date),
          value: d.fixedCost
        }))
      },
      {
        name: 'Custo Variável',
        series: this.data.map(d => ({
          name: formatDate(d.date),
          value: d.variableCost
        }))
      }
    ];
  }
}

