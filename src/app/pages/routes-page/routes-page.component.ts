import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { DashboardService } from '../../core/services/dashboard.service';
import { RoutePlan } from '../../core/models/route-plan.model';
import { RoutesMapLeafletComponent } from './routes-map-leaflet.component';

@Component({
  selector: 'app-routes-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatChipsModule,
    RoutesMapLeafletComponent
  ],
  templateUrl: './routes-page.component.html',
  styleUrls: ['./routes-page.component.scss']
})
export class RoutesPageComponent implements OnInit {
  routes: RoutePlan[] = [];
  displayedColumns: string[] = ['vehicle', 'distanceKm', 'cost', 'agencies'];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadRoutes();
  }

  loadRoutes(): void {
    this.dashboardService.getRoutes().subscribe(routes => {
      this.routes = routes;
    });
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }
}

