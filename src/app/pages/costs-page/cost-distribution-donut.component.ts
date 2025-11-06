import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-cost-distribution-donut',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    NgxChartsModule
  ],
  templateUrl: './cost-distribution-donut.component.html',
  styleUrls: ['./cost-distribution-donut.component.scss']
})
export class CostDistributionDonutComponent implements OnInit, OnChanges {
  @Input() data: { name: string; value: number }[] = [];

  // TODO: substituir dados mockados pelos custos reais vindos do serviço financeiro/logístico
  private readonly DEFAULT_DATA: { name: string; value: number }[] = [
    { name: 'Custo Fixo', value: 50000 },
    { name: 'Custo por Km', value: 30000 },
    { name: 'Custos Administrativos', value: 20000 }
  ];

  chartData: { name: string; value: number }[] = [];

  colorScheme: any = {
    domain: ['#2563eb', '#f59e0b', '#22c55e'] // azul, amarelo, verde
  };

  // View responsiva para o gráfico
  view: [number, number] = [500, 400];

  ngOnInit(): void {
    // Se não recebeu dados via @Input, usa dados padrão
    if (!this.data || this.data.length === 0) {
      this.chartData = [...this.DEFAULT_DATA];
    } else {
      this.chartData = [...this.data];
    }
  }

  ngOnChanges(): void {
    if (this.data && this.data.length > 0) {
      this.chartData = [...this.data];
    }
  }
}

