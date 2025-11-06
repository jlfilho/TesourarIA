import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { DashboardService } from '../../core/services/dashboard.service';
import { StockRisk } from '../../core/models/stock-risk.model';
import { CoverageHeatmapComponent } from './coverage-heatmap.component';
import { CentralCashLimitsChartComponent } from './central-cash-limits-chart.component';
import { AgencyCashLimitsChartComponent } from './agency-cash-limits-chart.component';

@Component({
  selector: 'app-stocks-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatBadgeModule,
    CoverageHeatmapComponent,
    CentralCashLimitsChartComponent,
    AgencyCashLimitsChartComponent
  ],
  templateUrl: './stocks-page.component.html',
  styleUrls: ['./stocks-page.component.scss']
})
export class StocksPageComponent implements OnInit {
  stocks: StockRisk[] = [];
  displayedColumns: string[] = ['agency', 'stockCurrent', 'demandForecast', 'daysCovered', 'level'];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadStocks();
  }

  loadStocks(): void {
    this.dashboardService.getStockRisks().subscribe(stocks => {
      this.stocks = stocks;
    });
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }

  getLevelClass(level: string): string {
    switch (level) {
      case 'ok': return 'level-ok';
      case 'atencao': return 'level-atencao';
      case 'critico': return 'level-critico';
      default: return '';
    }
  }

  getLevelLabel(level: string): string {
    switch (level) {
      case 'ok': return 'OK';
      case 'atencao': return 'Atenção';
      case 'critico': return 'Crítico';
      default: return level;
    }
  }
}

