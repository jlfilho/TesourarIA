import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CoverageRow } from '../../core/models/coverage-heatmap.model';

@Component({
  selector: 'app-coverage-heatmap',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTooltipModule
  ],
  templateUrl: './coverage-heatmap.component.html',
  styleUrls: ['./coverage-heatmap.component.scss']
})
export class CoverageHeatmapComponent implements OnInit {
  @Input() data: CoverageRow[] = [];

  days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

  // TODO: substituir mock pelos dados reais do serviço de otimização/previsão
  private mockData: CoverageRow[] = [
    {
      agencyId: 'AG_01',
      agencyName: 'Agência Centro',
      coverageByDay: [
        { day: 'Seg', daysCovered: 1.2 },
        { day: 'Ter', daysCovered: 0.8 },
        { day: 'Qua', daysCovered: 2.5 },
        { day: 'Qui', daysCovered: 3.5 },
        { day: 'Sex', daysCovered: 4.1 },
        { day: 'Sáb', daysCovered: 2.0 },
        { day: 'Dom', daysCovered: 1.0 },
      ]
    },
    {
      agencyId: 'AG_02',
      agencyName: 'Agência Bairro',
      coverageByDay: [
        { day: 'Seg', daysCovered: 0.5 },
        { day: 'Ter', daysCovered: 0.9 },
        { day: 'Qua', daysCovered: 1.1 },
        { day: 'Qui', daysCovered: 2.2 },
        { day: 'Sex', daysCovered: 3.0 },
        { day: 'Sáb', daysCovered: 3.4 },
        { day: 'Dom', daysCovered: 2.8 },
      ]
    },
    {
      agencyId: 'AG_03',
      agencyName: 'Agência Savassi',
      coverageByDay: [
        { day: 'Seg', daysCovered: 3.2 },
        { day: 'Ter', daysCovered: 3.5 },
        { day: 'Qua', daysCovered: 3.8 },
        { day: 'Qui', daysCovered: 4.0 },
        { day: 'Sex', daysCovered: 4.2 },
        { day: 'Sáb', daysCovered: 3.9 },
        { day: 'Dom', daysCovered: 3.6 },
      ]
    },
    {
      agencyId: 'AG_04',
      agencyName: 'Agência Funcionários',
      coverageByDay: [
        { day: 'Seg', daysCovered: 2.1 },
        { day: 'Ter', daysCovered: 1.8 },
        { day: 'Qua', daysCovered: 2.3 },
        { day: 'Qui', daysCovered: 3.1 },
        { day: 'Sex', daysCovered: 3.5 },
        { day: 'Sáb', daysCovered: 2.8 },
        { day: 'Dom', daysCovered: 2.2 },
      ]
    },
    {
      agencyId: 'AG_05',
      agencyName: 'Agência Lourdes',
      coverageByDay: [
        { day: 'Seg', daysCovered: 0.7 },
        { day: 'Ter', daysCovered: 0.6 },
        { day: 'Qua', daysCovered: 0.9 },
        { day: 'Qui', daysCovered: 1.2 },
        { day: 'Sex', daysCovered: 1.5 },
        { day: 'Sáb', daysCovered: 1.1 },
        { day: 'Dom', daysCovered: 0.8 },
      ]
    },
    {
      agencyId: 'AG_06',
      agencyName: 'Agência Pampulha',
      coverageByDay: [
        { day: 'Seg', daysCovered: 2.8 },
        { day: 'Ter', daysCovered: 3.2 },
        { day: 'Qua', daysCovered: 3.5 },
        { day: 'Qui', daysCovered: 3.8 },
        { day: 'Sex', daysCovered: 4.0 },
        { day: 'Sáb', daysCovered: 3.6 },
        { day: 'Dom', daysCovered: 3.3 },
      ]
    },
    {
      agencyId: 'AG_07',
      agencyName: 'Agência Contagem',
      coverageByDay: [
        { day: 'Seg', daysCovered: 1.5 },
        { day: 'Ter', daysCovered: 1.3 },
        { day: 'Qua', daysCovered: 1.7 },
        { day: 'Qui', daysCovered: 2.0 },
        { day: 'Sex', daysCovered: 2.4 },
        { day: 'Sáb', daysCovered: 1.9 },
        { day: 'Dom', daysCovered: 1.6 },
      ]
    },
    {
      agencyId: 'AG_08',
      agencyName: 'Agência Venda Nova',
      coverageByDay: [
        { day: 'Seg', daysCovered: 0.9 },
        { day: 'Ter', daysCovered: 1.1 },
        { day: 'Qua', daysCovered: 1.4 },
        { day: 'Qui', daysCovered: 1.8 },
        { day: 'Sex', daysCovered: 2.2 },
        { day: 'Sáb', daysCovered: 1.6 },
        { day: 'Dom', daysCovered: 1.2 },
      ]
    }
  ];

  ngOnInit(): void {
    // Se não recebeu dados via @Input, usa mock
    if (!this.data || this.data.length === 0) {
      this.data = this.mockData;
    }
  }

  getValue(row: CoverageRow, day: string): number {
    const item = row.coverageByDay.find(c => c.day === day);
    return item ? +item.daysCovered.toFixed(1) : 0;
  }

  getColor(row: CoverageRow, day: string): string {
    const v = this.getValue(row, day);
    if (v < 1) return '#ef4444';     // vermelho
    if (v < 3) return '#f97316';     // laranja
    return '#22c55e';                // verde
  }

  getTooltip(row: CoverageRow, day: string): string {
    return `${row.agencyName} - ${day}: ${this.getValue(row, day)} dias de cobertura`;
  }
}

