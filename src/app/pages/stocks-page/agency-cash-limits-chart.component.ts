import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

interface AgencyStockData {
  agencyId: string;
  agencyName: string;
  data: {
    day: number;
    stock: number;
    min: number;
    max: number;
  }[];
}

@Component({
  selector: 'app-agency-cash-limits-chart',
  standalone: true,
  imports: [
    CommonModule,
    NgxChartsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './agency-cash-limits-chart.component.html',
  styleUrls: ['./agency-cash-limits-chart.component.scss']
})
export class AgencyCashLimitsChartComponent implements OnInit {
  // Dados mockados para as 8 agências
  agenciesData: AgencyStockData[] = [
    {
      agencyId: 'AG_01',
      agencyName: 'Agência Centro',
      data: [
        { day: 1, stock: 180, min: 100, max: 250 },
        { day: 2, stock: 220, min: 100, max: 250 },
        { day: 3, stock: 95, min: 100, max: 250 },
        { day: 4, stock: 240, min: 100, max: 250 },
        { day: 5, stock: 260, min: 100, max: 250 },
        { day: 6, stock: 190, min: 100, max: 250 },
        { day: 7, stock: 150, min: 100, max: 250 }
      ]
    },
    {
      agencyId: 'AG_02',
      agencyName: 'Agência Bairro',
      data: [
        { day: 1, stock: 120, min: 80, max: 200 },
        { day: 2, stock: 140, min: 80, max: 200 },
        { day: 3, stock: 75, min: 80, max: 200 },
        { day: 4, stock: 185, min: 80, max: 200 },
        { day: 5, stock: 210, min: 80, max: 200 },
        { day: 6, stock: 160, min: 80, max: 200 },
        { day: 7, stock: 130, min: 80, max: 200 }
      ]
    },
    {
      agencyId: 'AG_03',
      agencyName: 'Agência Savassi',
      data: [
        { day: 1, stock: 320, min: 200, max: 400 },
        { day: 2, stock: 350, min: 200, max: 400 },
        { day: 3, stock: 380, min: 200, max: 400 },
        { day: 4, stock: 390, min: 200, max: 400 },
        { day: 5, stock: 410, min: 200, max: 400 },
        { day: 6, stock: 370, min: 200, max: 400 },
        { day: 7, stock: 340, min: 200, max: 400 }
      ]
    },
    {
      agencyId: 'AG_04',
      agencyName: 'Agência Funcionários',
      data: [
        { day: 1, stock: 150, min: 120, max: 300 },
        { day: 2, stock: 140, min: 120, max: 300 },
        { day: 3, stock: 160, min: 120, max: 300 },
        { day: 4, stock: 180, min: 120, max: 300 },
        { day: 5, stock: 200, min: 120, max: 300 },
        { day: 6, stock: 170, min: 120, max: 300 },
        { day: 7, stock: 155, min: 120, max: 300 }
      ]
    },
    {
      agencyId: 'AG_05',
      agencyName: 'Agência Lourdes',
      data: [
        { day: 1, stock: 60, min: 50, max: 150 },
        { day: 2, stock: 55, min: 50, max: 150 },
        { day: 3, stock: 70, min: 50, max: 150 },
        { day: 4, stock: 85, min: 50, max: 150 },
        { day: 5, stock: 100, min: 50, max: 150 },
        { day: 6, stock: 75, min: 50, max: 150 },
        { day: 7, stock: 65, min: 50, max: 150 }
      ]
    },
    {
      agencyId: 'AG_06',
      agencyName: 'Agência Pampulha',
      data: [
        { day: 1, stock: 280, min: 180, max: 350 },
        { day: 2, stock: 300, min: 180, max: 350 },
        { day: 3, stock: 320, min: 180, max: 350 },
        { day: 4, stock: 340, min: 180, max: 350 },
        { day: 5, stock: 360, min: 180, max: 350 },
        { day: 6, stock: 330, min: 180, max: 350 },
        { day: 7, stock: 310, min: 180, max: 350 }
      ]
    },
    {
      agencyId: 'AG_07',
      agencyName: 'Agência Contagem',
      data: [
        { day: 1, stock: 110, min: 90, max: 220 },
        { day: 2, stock: 100, min: 90, max: 220 },
        { day: 3, stock: 120, min: 90, max: 220 },
        { day: 4, stock: 140, min: 90, max: 220 },
        { day: 5, stock: 160, min: 90, max: 220 },
        { day: 6, stock: 130, min: 90, max: 220 },
        { day: 7, stock: 115, min: 90, max: 220 }
      ]
    },
    {
      agencyId: 'AG_08',
      agencyName: 'Agência Venda Nova',
      data: [
        { day: 1, stock: 85, min: 70, max: 180 },
        { day: 2, stock: 95, min: 70, max: 180 },
        { day: 3, stock: 110, min: 70, max: 180 },
        { day: 4, stock: 130, min: 70, max: 180 },
        { day: 5, stock: 150, min: 70, max: 180 },
        { day: 6, stock: 120, min: 70, max: 180 },
        { day: 7, stock: 100, min: 70, max: 180 }
      ]
    }
  ];

  selectedAgencyId: string = 'AG_01';
  selectedAgency: AgencyStockData | null = null;
  chartData: any[] = [];
  alerts: { type: string; message: string }[] = [];
  agencyOptions: { value: string; label: string }[] = [];

  colorScheme: any = {
    domain: ['#2563eb', '#dc2626', '#16a34a'] // azul, vermelho, verde
  };

  view: [number, number] = [1000, 400];

  ngOnInit() {
    // Pre-calcular as opções uma única vez
    this.agencyOptions = this.agenciesData.map(a => ({
      value: a.agencyId,
      label: a.agencyName
    }));
    
    this.selectedAgency = this.agenciesData.find(a => a.agencyId === this.selectedAgencyId) || this.agenciesData[0];
    this.updateChartData();
    this.generateAlerts();
  }

  onAgencyChange() {
    this.selectedAgency = this.agenciesData.find(a => a.agencyId === this.selectedAgencyId) || null;
    if (this.selectedAgency) {
      this.updateChartData();
      this.generateAlerts();
    }
  }

  private updateChartData(): void {
    if (!this.selectedAgency) return;

    this.chartData = [
      {
        name: `Estoque - ${this.selectedAgency.agencyName}`,
        series: this.selectedAgency.data.map(d => ({
          name: `Dia ${d.day}`,
          value: d.stock
        }))
      },
      {
        name: 'Limite Mínimo',
        series: this.selectedAgency.data.map(d => ({
          name: `Dia ${d.day}`,
          value: d.min
        }))
      },
      {
        name: 'Limite Máximo',
        series: this.selectedAgency.data.map(d => ({
          name: `Dia ${d.day}`,
          value: d.max
        }))
      }
    ];
  }

  generateAlerts() {
    if (!this.selectedAgency) return;

    this.alerts = [];
    this.selectedAgency.data.forEach(d => {
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

