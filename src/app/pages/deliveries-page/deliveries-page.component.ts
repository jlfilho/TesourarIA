import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DashboardService } from '../../core/services/dashboard.service';
import { DeliveryPlan } from '../../core/models/delivery-plan.model';

@Component({
  selector: 'app-deliveries-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './deliveries-page.component.html',
  styleUrls: ['./deliveries-page.component.scss']
})
export class DeliveriesPageComponent implements OnInit {
  deliveries: DeliveryPlan[] = [];
  displayedColumns: string[] = ['agency', 'date', 'volume', 'status', 'actions'];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadDeliveries();
  }

  loadDeliveries(): void {
    this.dashboardService.getDeliveries().subscribe(deliveries => {
      this.deliveries = deliveries;
    });
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

  getStatusLabel(status: string): string {
    switch (status) {
      case 'planejada': return 'Planejada';
      case 'em_rota': return 'Em Rota';
      case 'concluida': return 'Concluída';
      default: return status;
    }
  }

  getStatusClass(status: string): string {
    return `status-${status}`;
  }

  exportCSV(): void {
    // TODO: Implementar exportação CSV
    console.log('Exportar CSV - funcionalidade a ser implementada');
  }
}

