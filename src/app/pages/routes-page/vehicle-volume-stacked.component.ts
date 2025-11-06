import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { VehicleVolume } from '../../core/models/vehicle-volume.model';

@Component({
  selector: 'app-vehicle-volume-stacked',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    NgxChartsModule
  ],
  templateUrl: './vehicle-volume-stacked.component.html',
  styleUrls: ['./vehicle-volume-stacked.component.scss']
})
export class VehicleVolumeStackedComponent implements OnInit {
  @Input() chartData: any[] = [];

  // TODO: substituir dados mockados pelos dados reais do serviço de rotas/VRP
  private readonly RAW_DATA: VehicleVolume[] = [
    { vehicle: 'Veículo VR-001', day: 'Seg', volume: 120000 },
    { vehicle: 'Veículo VR-001', day: 'Ter', volume: 90000 },
    { vehicle: 'Veículo VR-001', day: 'Qua', volume: 150000 },
    { vehicle: 'Veículo VR-001', day: 'Qui', volume: 130000 },
    { vehicle: 'Veículo VR-001', day: 'Sex', volume: 110000 },
    { vehicle: 'Veículo VR-001', day: 'Sáb', volume: 80000 },
    { vehicle: 'Veículo VR-001', day: 'Dom', volume: 70000 },
    
    { vehicle: 'Veículo VR-002', day: 'Seg', volume: 80000 },
    { vehicle: 'Veículo VR-002', day: 'Ter', volume: 70000 },
    { vehicle: 'Veículo VR-002', day: 'Qua', volume: 60000 },
    { vehicle: 'Veículo VR-002', day: 'Qui', volume: 95000 },
    { vehicle: 'Veículo VR-002', day: 'Sex', volume: 85000 },
    { vehicle: 'Veículo VR-002', day: 'Sáb', volume: 75000 },
    { vehicle: 'Veículo VR-002', day: 'Dom', volume: 65000 },
    
    { vehicle: 'Veículo VR-003', day: 'Seg', volume: 50000 },
    { vehicle: 'Veículo VR-003', day: 'Ter', volume: 110000 },
    { vehicle: 'Veículo VR-003', day: 'Qua', volume: 90000 },
    { vehicle: 'Veículo VR-003', day: 'Qui', volume: 100000 },
    { vehicle: 'Veículo VR-003', day: 'Sex', volume: 85000 },
    { vehicle: 'Veículo VR-003', day: 'Sáb', volume: 60000 },
    { vehicle: 'Veículo VR-003', day: 'Dom', volume: 55000 },
    
    { vehicle: 'Veículo VR-004', day: 'Seg', volume: 95000 },
    { vehicle: 'Veículo VR-004', day: 'Ter', volume: 85000 },
    { vehicle: 'Veículo VR-004', day: 'Qua', volume: 105000 },
    { vehicle: 'Veículo VR-004', day: 'Qui', volume: 90000 },
    { vehicle: 'Veículo VR-004', day: 'Sex', volume: 80000 },
    { vehicle: 'Veículo VR-004', day: 'Sáb', volume: 70000 },
    { vehicle: 'Veículo VR-004', day: 'Dom', volume: 60000 },
    
    { vehicle: 'Veículo VR-005', day: 'Seg', volume: 70000 },
    { vehicle: 'Veículo VR-005', day: 'Ter', volume: 80000 },
    { vehicle: 'Veículo VR-005', day: 'Qua', volume: 75000 },
    { vehicle: 'Veículo VR-005', day: 'Qui', volume: 85000 },
    { vehicle: 'Veículo VR-005', day: 'Sex', volume: 90000 },
    { vehicle: 'Veículo VR-005', day: 'Sáb', volume: 65000 },
    { vehicle: 'Veículo VR-005', day: 'Dom', volume: 60000 }
  ];

  // Dados padrão transformados para o formato do ngx-charts
  private readonly DEFAULT_DATA: any[] = [
    {
      name: 'Veículo VR-001',
      series: [
        { name: 'Seg', value: 120000 },
        { name: 'Ter', value: 90000 },
        { name: 'Qua', value: 150000 },
        { name: 'Qui', value: 130000 },
        { name: 'Sex', value: 110000 },
        { name: 'Sáb', value: 80000 },
        { name: 'Dom', value: 70000 }
      ]
    },
    {
      name: 'Veículo VR-002',
      series: [
        { name: 'Seg', value: 80000 },
        { name: 'Ter', value: 70000 },
        { name: 'Qua', value: 60000 },
        { name: 'Qui', value: 95000 },
        { name: 'Sex', value: 85000 },
        { name: 'Sáb', value: 75000 },
        { name: 'Dom', value: 65000 }
      ]
    },
    {
      name: 'Veículo VR-003',
      series: [
        { name: 'Seg', value: 50000 },
        { name: 'Ter', value: 110000 },
        { name: 'Qua', value: 90000 },
        { name: 'Qui', value: 100000 },
        { name: 'Sex', value: 85000 },
        { name: 'Sáb', value: 60000 },
        { name: 'Dom', value: 55000 }
      ]
    },
    {
      name: 'Veículo VR-004',
      series: [
        { name: 'Seg', value: 95000 },
        { name: 'Ter', value: 85000 },
        { name: 'Qua', value: 105000 },
        { name: 'Qui', value: 90000 },
        { name: 'Sex', value: 80000 },
        { name: 'Sáb', value: 70000 },
        { name: 'Dom', value: 60000 }
      ]
    },
    {
      name: 'Veículo VR-005',
      series: [
        { name: 'Seg', value: 70000 },
        { name: 'Ter', value: 80000 },
        { name: 'Qua', value: 75000 },
        { name: 'Qui', value: 85000 },
        { name: 'Sex', value: 90000 },
        { name: 'Sáb', value: 65000 },
        { name: 'Dom', value: 60000 }
      ]
    }
  ];

  colorScheme: any = {
    domain: ['#2563eb', '#22c55e', '#f97316', '#a855f7', '#0f766e', '#ec4899', '#14b8a6']
  };

  // View responsiva para o gráfico
  view: [number, number] = [1000, 400];

  ngOnInit(): void {
    // Se não recebeu dados via @Input, usa dados padrão
    if (!this.chartData || this.chartData.length === 0) {
      this.chartData = this.DEFAULT_DATA;
    }
  }

  /**
   * Método auxiliar para transformar dados RAW_DATA em formato do ngx-charts
   * Útil para quando os dados vierem do serviço em formato VehicleVolume[]
   * 
   * Nota: As "pilhas" podem ser dias da semana (como está) ou agências.
   * Para trocar para agências, basta alterar o campo 'day' para 'agency' 
   * e ajustar o name dentro de series.
   */
  transformRawData(rawData: VehicleVolume[]): any[] {
    const vehiclesMap = new Map<string, Map<string, number>>();

    // Agrupar por veículo e dia
    rawData.forEach(item => {
      if (!vehiclesMap.has(item.vehicle)) {
        vehiclesMap.set(item.vehicle, new Map());
      }
      const vehicleData = vehiclesMap.get(item.vehicle)!;
      vehicleData.set(item.day, item.volume);
    });

    // Converter para formato do ngx-charts
    const result: any[] = [];
    vehiclesMap.forEach((dayMap, vehicle) => {
      const series = Array.from(dayMap.entries()).map(([day, volume]) => ({
        name: day,
        value: volume
      }));
      result.push({ name: vehicle, series });
    });

    return result;
  }
}

