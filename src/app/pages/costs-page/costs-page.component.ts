import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { DashboardService } from '../../core/services/dashboard.service';
import { CostSummary } from '../../core/models/cost-summary.model';

@Component({
  selector: 'app-costs-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatDividerModule
  ],
  templateUrl: './costs-page.component.html',
  styleUrls: ['./costs-page.component.scss']
})
export class CostsPageComponent implements OnInit {
  costs: CostSummary[] = [];
  displayedColumns: string[] = ['date', 'transportCost', 'fixedCost', 'variableCost', 'total'];

  totalFixed = 0;
  totalVariable = 0;
  totalTransport = 0;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadCosts();
  }

  loadCosts(): void {
    this.dashboardService.getCosts().subscribe(costs => {
      this.costs = costs;
      this.calculateTotals();
    });
  }

  calculateTotals(): void {
    this.totalFixed = this.costs.reduce((sum, cost) => sum + cost.fixedCost, 0);
    this.totalVariable = this.costs.reduce((sum, cost) => sum + cost.variableCost, 0);
    this.totalTransport = this.costs.reduce((sum, cost) => sum + cost.transportCost, 0);
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('pt-BR');
  }

  getTotalCost(cost: CostSummary): number {
    return cost.transportCost + cost.fixedCost + cost.variableCost;
  }

  getFixedPercentage(): number {
    const total = this.totalFixed + this.totalVariable;
    return total > 0 ? (this.totalFixed / total) * 100 : 0;
  }

  getVariablePercentage(): number {
    const total = this.totalFixed + this.totalVariable;
    return total > 0 ? (this.totalVariable / total) * 100 : 0;
  }
}

