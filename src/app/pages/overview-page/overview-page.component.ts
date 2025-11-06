import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { DashboardService } from '../../core/services/dashboard.service';
import { DashboardKPIs } from '../../core/models/cost-summary.model';
import { StockRisk } from '../../core/models/stock-risk.model';
import { CostSummary } from '../../core/models/cost-summary.model';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-overview-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule
  ],
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss']
})
export class OverviewPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('costChart', { static: false }) costChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('costBreakdownChart', { static: false }) costBreakdownChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('coverageChart', { static: false }) coverageChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('riskChart', { static: false }) riskChartRef!: ElementRef<HTMLCanvasElement>;

  kpis: DashboardKPIs | null = null;
  criticalAgencies: StockRisk[] = [];
  costs: CostSummary[] = [];
  allStockRisks: StockRisk[] = [];
  
  displayedColumns: string[] = ['agency', 'daysCovered', 'level'];

  private costChart: Chart | null = null;
  private costBreakdownChart: Chart | null = null;
  private coverageChart: Chart | null = null;
  private riskChart: Chart | null = null;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadKPIs();
    this.loadCriticalAgencies();
    this.loadCosts();
    this.loadAllStockRisks();
  }

  ngAfterViewInit(): void {
    // Aguardar um ciclo para garantir que os dados estão carregados
    setTimeout(() => {
      this.tryCreateCharts();
    }, 200);
  }

  ngOnDestroy(): void {
    if (this.costChart) this.costChart.destroy();
    if (this.costBreakdownChart) this.costBreakdownChart.destroy();
    if (this.coverageChart) this.coverageChart.destroy();
    if (this.riskChart) this.riskChart.destroy();
  }

  loadKPIs(): void {
    this.dashboardService.getKPIs().subscribe(kpis => {
      this.kpis = kpis;
    });
  }

  loadCriticalAgencies(): void {
    this.dashboardService.getTopCriticalAgencies(5).subscribe(agencies => {
      this.criticalAgencies = agencies;
    });
  }

  loadCosts(): void {
    this.dashboardService.getCosts().subscribe(costs => {
      this.costs = costs;
      this.tryCreateCharts();
    });
  }

  loadAllStockRisks(): void {
    this.dashboardService.getStockRisks().subscribe(risks => {
      this.allStockRisks = risks;
      this.tryCreateCharts();
    });
  }

  tryCreateCharts(): void {
    // Verificar se todos os elementos e dados estão disponíveis
    if (this.costChartRef && this.costBreakdownChartRef && 
        this.coverageChartRef && this.riskChartRef &&
        this.costs.length > 0 && this.allStockRisks.length > 0) {
      this.createCharts();
    }
  }

  createCharts(): void {
    this.createCostChart();
    this.createCostBreakdownChart();
    this.createCoverageChart();
    this.createRiskChart();
  }

  createCostChart(): void {
    if (!this.costChartRef || !this.costs.length) return;

    const ctx = this.costChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    if (this.costChart) {
      this.costChart.destroy();
    }

    const labels = this.costs.map(c => c.date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }));
    const transportCosts = this.costs.map(c => c.transportCost);

    this.costChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Custo de Transporte',
          data: transportCosts,
          borderColor: '#1976d2',
          backgroundColor: 'rgba(25, 118, 210, 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const value = context.parsed.y;
                if (value === null || value === undefined) return '';
                return `R$ ${value.toFixed(2).replace('.', ',')}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => {
                return `R$ ${Number(value).toFixed(0)}`;
              }
            }
          }
        }
      }
    });
  }

  createCostBreakdownChart(): void {
    if (!this.costBreakdownChartRef || !this.costs.length) return;

    const ctx = this.costBreakdownChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    if (this.costBreakdownChart) {
      this.costBreakdownChart.destroy();
    }

    // Calcular médias dos últimos 7 dias
    const avgTransport = this.costs.reduce((sum, c) => sum + c.transportCost, 0) / this.costs.length;
    const avgFixed = this.costs.reduce((sum, c) => sum + c.fixedCost, 0) / this.costs.length;
    const avgVariable = this.costs.reduce((sum, c) => sum + c.variableCost, 0) / this.costs.length;

    this.costBreakdownChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Transporte', 'Custo Fixo', 'Custo Variável'],
        datasets: [{
          data: [avgTransport, avgFixed, avgVariable],
          backgroundColor: [
            '#1976d2',
            '#42a5f5',
            '#90caf9'
          ],
          borderWidth: 2,
          borderColor: '#fff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'bottom'
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                const value = context.parsed || 0;
                const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                const percentage = ((value / total) * 100).toFixed(1);
                return `${label}: R$ ${value.toFixed(2).replace('.', ',')} (${percentage}%)`;
              }
            }
          }
        }
      }
    });
  }

  createCoverageChart(): void {
    if (!this.coverageChartRef || !this.allStockRisks.length) return;

    const ctx = this.coverageChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    if (this.coverageChart) {
      this.coverageChart.destroy();
    }

    // Top 5 agências por cobertura
    const topAgencies = [...this.allStockRisks]
      .sort((a, b) => b.daysCovered - a.daysCovered)
      .slice(0, 5);

    const labels = topAgencies.map(a => a.agency);
    const coverage = topAgencies.map(a => a.daysCovered);

    this.coverageChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Dias de Cobertura',
          data: coverage,
          backgroundColor: '#4caf50',
          borderColor: '#388e3c',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const value = context.parsed.y;
                if (value === null || value === undefined) return '';
                return `${value.toFixed(1)} dias`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => {
                return `${value} dias`;
              }
            }
          }
        }
      }
    });
  }

  createRiskChart(): void {
    if (!this.riskChartRef || !this.allStockRisks.length) return;

    const ctx = this.riskChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    if (this.riskChart) {
      this.riskChart.destroy();
    }

    // Contar agências por nível de risco
    const okCount = this.allStockRisks.filter(r => r.level === 'ok').length;
    const atencaoCount = this.allStockRisks.filter(r => r.level === 'atencao').length;
    const criticoCount = this.allStockRisks.filter(r => r.level === 'critico').length;

    this.riskChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['OK', 'Atenção', 'Crítico'],
        datasets: [{
          data: [okCount, atencaoCount, criticoCount],
          backgroundColor: [
            '#4caf50',
            '#ff9800',
            '#f44336'
          ],
          borderWidth: 2,
          borderColor: '#fff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'bottom'
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                const value = context.parsed || 0;
                const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                const percentage = ((value / total) * 100).toFixed(1);
                return `${label}: ${value} agências (${percentage}%)`;
              }
            }
          }
        }
      }
    });
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
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

