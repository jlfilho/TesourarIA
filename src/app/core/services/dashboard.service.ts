import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DashboardKPIs, CostSummary } from '../models/cost-summary.model';
import { DeliveryPlan } from '../models/delivery-plan.model';
import { RoutePlan, RouteWithCoordinates, RoutePlanLeaflet } from '../models/route-plan.model';
import { StockRisk } from '../models/stock-risk.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  
  getKPIs(): Observable<DashboardKPIs> {
    return of({
      totalTransportCost: 12800.50,
      totalTrips: 12,
      coverageAvgDays: 3.4,
      agenciesAtRisk: 4
    });
  }

  getDeliveries(): Observable<DeliveryPlan[]> {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    return of([
      { id: '1', agency: 'Agência Centro', agencyCode: '001', date: today, volume: 250000, status: 'concluida' },
      { id: '2', agency: 'Agência Norte', agencyCode: '002', date: today, volume: 180000, status: 'em_rota' },
      { id: '3', agency: 'Agência Sul', agencyCode: '003', date: today, volume: 320000, status: 'planejada' },
      { id: '4', agency: 'Agência Leste', agencyCode: '004', date: today, volume: 150000, status: 'concluida' },
      { id: '5', agency: 'Agência Oeste', agencyCode: '005', date: today, volume: 220000, status: 'em_rota' },
      { id: '6', agency: 'Agência Centro', agencyCode: '001', date: tomorrow, volume: 280000, status: 'planejada' },
      { id: '7', agency: 'Agência Norte', agencyCode: '002', date: tomorrow, volume: 190000, status: 'planejada' },
      { id: '8', agency: 'Agência Sul', agencyCode: '003', date: tomorrow, volume: 310000, status: 'planejada' },
    ]);
  }

  getRoutes(): Observable<RoutePlan[]> {
    return of([
      { id: '1', vehicle: 'VR-001', distanceKm: 245, cost: 2450, agencies: ['Agência Centro', 'Agência Norte', 'Agência Leste'] },
      { id: '2', vehicle: 'VR-002', distanceKm: 180, cost: 1800, agencies: ['Agência Sul', 'Agência Oeste'] },
      { id: '3', vehicle: 'VR-003', distanceKm: 320, cost: 3200, agencies: ['Agência Centro', 'Agência Sul', 'Agência Norte'] },
      { id: '4', vehicle: 'VR-004', distanceKm: 195, cost: 1950, agencies: ['Agência Leste', 'Agência Oeste'] },
    ]);
  }

  // TODO: Integrar com dados reais do solver VRP
  getRoutesWithCoordinates(): Observable<RouteWithCoordinates[]> {
    // Centro logístico (depot) - coordenadas de exemplo (São Paulo)
    const depot = { lat: -23.5505, lng: -46.6333, name: 'Centro Logístico' };

    // Coordenadas mockadas das agências (São Paulo e região metropolitana)
    const agenciesCoordinates: { [key: string]: { lat: number; lng: number } } = {
      'Agência Centro': { lat: -23.5505, lng: -46.6333 },
      'Agência Norte': { lat: -23.4569, lng: -46.6333 },
      'Agência Sul': { lat: -23.6441, lng: -46.6333 },
      'Agência Leste': { lat: -23.5505, lng: -46.5333 },
      'Agência Oeste': { lat: -23.5505, lng: -46.7333 },
      'Agência Jardim': { lat: -23.5000, lng: -46.6000 },
      'Agência Parque': { lat: -23.6000, lng: -46.6500 },
      'Agência Praia': { lat: -23.5200, lng: -46.7000 }
    };

    const routes: RouteWithCoordinates[] = [
      {
        id: '1',
        vehicle: 'VR-001',
        distanceKm: 245,
        cost: 2450,
        agencies: ['Agência Centro', 'Agência Norte', 'Agência Leste'],
        depot,
        path: [
          { lat: agenciesCoordinates['Agência Centro'].lat, lng: agenciesCoordinates['Agência Centro'].lng, agencyName: 'Agência Centro', agencyCode: '001' },
          { lat: agenciesCoordinates['Agência Norte'].lat, lng: agenciesCoordinates['Agência Norte'].lng, agencyName: 'Agência Norte', agencyCode: '002' },
          { lat: agenciesCoordinates['Agência Leste'].lat, lng: agenciesCoordinates['Agência Leste'].lng, agencyName: 'Agência Leste', agencyCode: '004' }
        ]
      },
      {
        id: '2',
        vehicle: 'VR-002',
        distanceKm: 180,
        cost: 1800,
        agencies: ['Agência Sul', 'Agência Oeste'],
        depot,
        path: [
          { lat: agenciesCoordinates['Agência Sul'].lat, lng: agenciesCoordinates['Agência Sul'].lng, agencyName: 'Agência Sul', agencyCode: '003' },
          { lat: agenciesCoordinates['Agência Oeste'].lat, lng: agenciesCoordinates['Agência Oeste'].lng, agencyName: 'Agência Oeste', agencyCode: '005' }
        ]
      },
      {
        id: '3',
        vehicle: 'VR-003',
        distanceKm: 320,
        cost: 3200,
        agencies: ['Agência Centro', 'Agência Sul', 'Agência Norte'],
        depot,
        path: [
          { lat: agenciesCoordinates['Agência Centro'].lat, lng: agenciesCoordinates['Agência Centro'].lng, agencyName: 'Agência Centro', agencyCode: '001' },
          { lat: agenciesCoordinates['Agência Sul'].lat, lng: agenciesCoordinates['Agência Sul'].lng, agencyName: 'Agência Sul', agencyCode: '003' },
          { lat: agenciesCoordinates['Agência Norte'].lat, lng: agenciesCoordinates['Agência Norte'].lng, agencyName: 'Agência Norte', agencyCode: '002' }
        ]
      },
      {
        id: '4',
        vehicle: 'VR-004',
        distanceKm: 195,
        cost: 1950,
        agencies: ['Agência Leste', 'Agência Oeste'],
        depot,
        path: [
          { lat: agenciesCoordinates['Agência Leste'].lat, lng: agenciesCoordinates['Agência Leste'].lng, agencyName: 'Agência Leste', agencyCode: '004' },
          { lat: agenciesCoordinates['Agência Oeste'].lat, lng: agenciesCoordinates['Agência Oeste'].lng, agencyName: 'Agência Oeste', agencyCode: '005' }
        ]
      }
    ];

    return of(routes);
  }

  getStockRisks(): Observable<StockRisk[]> {
    return of([
      { id: '1', agency: 'Agência Centro', agencyCode: '001', stockCurrent: 500000, demandForecast: 120000, daysCovered: 4.2, level: 'ok' },
      { id: '2', agency: 'Agência Norte', agencyCode: '002', stockCurrent: 180000, demandForecast: 80000, daysCovered: 2.3, level: 'atencao' },
      { id: '3', agency: 'Agência Sul', agencyCode: '003', stockCurrent: 95000, demandForecast: 75000, daysCovered: 1.3, level: 'critico' },
      { id: '4', agency: 'Agência Leste', agencyCode: '004', stockCurrent: 220000, demandForecast: 90000, daysCovered: 2.4, level: 'atencao' },
      { id: '5', agency: 'Agência Oeste', agencyCode: '005', stockCurrent: 450000, demandForecast: 110000, daysCovered: 4.1, level: 'ok' },
      { id: '6', agency: 'Agência Jardim', agencyCode: '006', stockCurrent: 65000, demandForecast: 60000, daysCovered: 1.1, level: 'critico' },
      { id: '7', agency: 'Agência Parque', agencyCode: '007', stockCurrent: 280000, demandForecast: 95000, daysCovered: 2.9, level: 'ok' },
      { id: '8', agency: 'Agência Praia', agencyCode: '008', stockCurrent: 150000, demandForecast: 85000, daysCovered: 1.8, level: 'atencao' },
    ]);
  }

  getCosts(): Observable<CostSummary[]> {
    const costs: CostSummary[] = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      costs.push({
        date,
        transportCost: 10000 + (Math.random() * 5000),
        fixedCost: 5000 + (Math.random() * 2000),
        variableCost: 3000 + (Math.random() * 3000)
      });
    }
    
    return of(costs);
  }

  getTopCriticalAgencies(count: number = 5): Observable<StockRisk[]> {
    return this.getStockRisks().pipe(
      map(risks => {
        return risks
          .sort((a, b) => a.daysCovered - b.daysCovered)
          .slice(0, count);
      })
    );
  }

  // TODO: Integrar com rotas reais do backend (VRP solver)
  // Função auxiliar para calcular distância entre dois pontos (Haversine simplificado)
  private calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371; // Raio da Terra em km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  // Função para ordenar agências pelo menor caminho (Nearest Neighbor heuristic)
  private optimizeRoute(stops: { name: string; lat: number; lng: number }[]): { name: string; lat: number; lng: number }[] {
    if (stops.length <= 1) return stops;

    const depot = { lat: -19.9167, lng: -43.9345 };
    const unvisited = [...stops];
    const optimized: { name: string; lat: number; lng: number }[] = [];
    let current = depot;

    while (unvisited.length > 0) {
      let nearestIndex = 0;
      let nearestDistance = this.calculateDistance(current.lat, current.lng, unvisited[0].lat, unvisited[0].lng);

      for (let i = 1; i < unvisited.length; i++) {
        const distance = this.calculateDistance(current.lat, current.lng, unvisited[i].lat, unvisited[i].lng);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = i;
        }
      }

      const next = unvisited.splice(nearestIndex, 1)[0];
      optimized.push(next);
      current = next;
    }

    return optimized;
  }

  getRoutesForToday(): Observable<RoutePlanLeaflet[]> {
    const depot = { name: 'Centro Logístico', lat: -19.9167, lng: -43.9345 };
    
    // Definir todas as agências disponíveis
    const allAgencies: { name: string; lat: number; lng: number }[] = [
      // Região Centro/Sul
      { name: 'Agência Centro', lat: -19.9167, lng: -43.9345 },
      { name: 'Agência Savassi', lat: -19.9389, lng: -43.9381 },
      { name: 'Agência Funcionários', lat: -19.9350, lng: -43.9200 },
      { name: 'Agência Lourdes', lat: -19.9280, lng: -43.9300 },
      { name: 'Agência Floresta', lat: -19.9400, lng: -43.9500 },
      { name: 'Agência Gutierrez', lat: -19.9300, lng: -43.9400 },
      { name: 'Agência Santa Tereza', lat: -19.9200, lng: -43.9100 },
      { name: 'Agência Anchieta', lat: -19.9200, lng: -43.9800 },
      { name: 'Agência Belvedere', lat: -19.9500, lng: -43.9200 },
      { name: 'Agência Cidade Jardim', lat: -19.9500, lng: -43.9600 },
      { name: 'Agência Estoril', lat: -19.9300, lng: -43.9700 },
      { name: 'Agência Buritis', lat: -19.9733, lng: -43.9744 },
      
      // Região Norte
      { name: 'Agência Pampulha', lat: -19.8627, lng: -43.9678 },
      { name: 'Agência Venda Nova', lat: -19.7700, lng: -43.9500 },
      { name: 'Agência Cidade Nova', lat: -19.9000, lng: -43.9000 },
      { name: 'Agência Barreiro', lat: -19.9700, lng: -43.9900 },
      
      // Região Oeste
      { name: 'Agência Contagem', lat: -19.9317, lng: -44.0536 },
      { name: 'Agência Betim', lat: -19.9678, lng: -44.1978 },
      { name: 'Agência Ibirité', lat: -20.0167, lng: -44.0583 },
      { name: 'Agência Sarzedo', lat: -20.0333, lng: -44.1500 },
      { name: 'Agência Mário Campos', lat: -20.0500, lng: -44.2000 },
      { name: 'Agência Brumadinho', lat: -20.1333, lng: -44.2000 },
      
      // Região Leste
      { name: 'Agência Nova Lima', lat: -19.9922, lng: -43.8467 },
      { name: 'Agência Raposos', lat: -19.9650, lng: -43.8000 },
      { name: 'Agência Ribeirão das Neves', lat: -19.7667, lng: -44.0833 },
      { name: 'Agência Santa Luzia', lat: -19.7697, lng: -43.8514 },
      { name: 'Agência Vespasiano', lat: -19.6917, lng: -43.9233 },
      { name: 'Agência Lagoa Santa', lat: -19.6333, lng: -43.8833 },
      { name: 'Agência Confins', lat: -19.6333, lng: -43.9833 },
      
      // Agências adicionais para rotas com 10+ paradas
      { name: 'Agência Gameleira', lat: -19.9550, lng: -43.9900 },
      { name: 'Agência Calafate', lat: -19.9450, lng: -43.9750 },
      { name: 'Agência Sagrada Família', lat: -19.9250, lng: -43.9450 },
      { name: 'Agência Carlos Prates', lat: -19.9150, lng: -43.9550 },
      { name: 'Agência Caiçara', lat: -19.9050, lng: -43.9650 },
      { name: 'Agência São Pedro', lat: -19.8950, lng: -43.9750 },
      { name: 'Agência Santa Efigênia', lat: -19.8850, lng: -43.9850 },
      { name: 'Agência Horto', lat: -19.8750, lng: -43.9950 },
      { name: 'Agência Floresta', lat: -19.8650, lng: -44.0050 },
      { name: 'Agência Grajaú', lat: -19.8550, lng: -44.0150 },
      { name: 'Agência São Lucas', lat: -19.8450, lng: -44.0250 },
      { name: 'Agência União', lat: -19.8350, lng: -44.0350 },
      { name: 'Agência Aarão Reis', lat: -19.8250, lng: -44.0450 },
      { name: 'Agência Tupi', lat: -19.8150, lng: -44.0550 },
      { name: 'Agência São Paulo', lat: -19.8050, lng: -44.0650 }
    ];

    // Função para calcular distância total de uma rota
    const calculateRouteDistance = (stops: { name: string; lat: number; lng: number }[]): number => {
      if (stops.length === 0) return 0;
      let total = this.calculateDistance(depot.lat, depot.lng, stops[0].lat, stops[0].lng);
      for (let i = 0; i < stops.length - 1; i++) {
        total += this.calculateDistance(stops[i].lat, stops[i].lng, stops[i + 1].lat, stops[i + 1].lng);
      }
      total += this.calculateDistance(stops[stops.length - 1].lat, stops[stops.length - 1].lng, depot.lat, depot.lng);
      return Math.round(total);
    };

    // Rotas com diferentes números de agências (reduzido para melhor performance)
    const routes: RoutePlanLeaflet[] = [
      // Rota 1: Média (5 agências) - MENOR CAMINHO OTIMIZADO
      {
        vehicleId: 'VR-001',
        vehicleName: 'Veículo VR-001 - Rota Sul',
        color: '#1E88E5',
        distanceKm: 0, // Será calculado
        cost: 0, // Será calculado
        stops: this.optimizeRoute([
          allAgencies[0],  // Centro
          allAgencies[1],  // Savassi
          allAgencies[2],  // Funcionários
          allAgencies[3],  // Lourdes
          allAgencies[4]   // Floresta
        ])
      },
      
      // Rota 2: Média (6 agências) - MENOR CAMINHO OTIMIZADO
      {
        vehicleId: 'VR-002',
        vehicleName: 'Veículo VR-002 - Rota Norte',
        color: '#43A047',
        distanceKm: 0,
        cost: 0,
        stops: this.optimizeRoute([
          allAgencies[12], // Pampulha
          allAgencies[13], // Venda Nova
          allAgencies[14], // Cidade Nova
          allAgencies[25], // Nova Lima
          allAgencies[26], // Raposos
          allAgencies[27]  // Ribeirão das Neves
        ])
      },
      
      // Rota 3: Média (5 agências) - MENOR CAMINHO OTIMIZADO
      {
        vehicleId: 'VR-003',
        vehicleName: 'Veículo VR-003 - Rota Oeste',
        color: '#F4511E',
        distanceKm: 0,
        cost: 0,
        stops: this.optimizeRoute([
          allAgencies[16], // Contagem
          allAgencies[17], // Betim
          allAgencies[18], // Ibirité
          allAgencies[19], // Sarzedo
          allAgencies[20]  // Mário Campos
        ])
      },
      
      // Rota 4: Pequena (4 agências)
      {
        vehicleId: 'VR-004',
        vehicleName: 'Veículo VR-004',
        color: '#E91E63',
        distanceKm: 0,
        cost: 0,
        stops: this.optimizeRoute([
          allAgencies[5],  // Gutierrez
          allAgencies[6],  // Santa Tereza
          allAgencies[7],  // Anchieta
          allAgencies[8]   // Belvedere
        ])
      },
      
      // Rota 5: Pequena (3 agências)
      {
        vehicleId: 'VR-005',
        vehicleName: 'Veículo VR-005',
        color: '#9C27B0',
        distanceKm: 0,
        cost: 0,
        stops: this.optimizeRoute([
          allAgencies[9],  // Cidade Jardim
          allAgencies[10], // Estoril
          allAgencies[11]  // Buritis
        ])
      },
      
      // Rota 6: Pequena (3 agências)
      {
        vehicleId: 'VR-006',
        vehicleName: 'Veículo VR-006',
        color: '#FF9800',
        distanceKm: 0,
        cost: 0,
        stops: this.optimizeRoute([
          allAgencies[28], // Santa Luzia
          allAgencies[29], // Vespasiano
          allAgencies[30]  // Lagoa Santa
        ])
      },
      
      // Rota 7: Pequena (4 agências)
      {
        vehicleId: 'VR-007',
        vehicleName: 'Veículo VR-007',
        color: '#00BCD4',
        distanceKm: 0,
        cost: 0,
        stops: this.optimizeRoute([
          allAgencies[31], // Confins
          allAgencies[12], // Pampulha
          allAgencies[0],  // Centro
          allAgencies[1]   // Savassi
        ])
      },
      
      // Rota 8: Pequena (3 agências)
      {
        vehicleId: 'VR-008',
        vehicleName: 'Veículo VR-008',
        color: '#795548',
        distanceKm: 0,
        cost: 0,
        stops: this.optimizeRoute([
          allAgencies[2],  // Funcionários
          allAgencies[3],  // Lourdes
          allAgencies[6]  // Santa Tereza
        ])
      }
    ];

    // Calcular distância e custo para cada rota (R$ 10 por km)
    routes.forEach(route => {
      if (route.distanceKm === 0) {
        route.distanceKm = calculateRouteDistance(route.stops);
        route.cost = route.distanceKm * 10;
      }
    });

    console.log('DashboardService: Retornando', routes.length, 'rotas');
    return of(routes);
  }
}

