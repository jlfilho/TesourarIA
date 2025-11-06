import { Component, OnInit, OnDestroy, Input, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DashboardService } from '../../core/services/dashboard.service';
import { RoutePlanLeaflet } from '../../core/models/route-plan.model';
import * as L from 'leaflet';

@Component({
  selector: 'app-routes-map',
  standalone: true,
  imports: [
    CommonModule,
    LeafletModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './routes-map-leaflet.component.html',
  styleUrls: ['./routes-map-leaflet.component.scss']
})
export class RoutesMapLeafletComponent implements OnInit, OnDestroy {
  @Input() routes?: RoutePlanLeaflet[]; // Para receber rotas via Input no futuro

  routesData: RoutePlanLeaflet[] = [];
  selectedRouteId: string | null = null;
  activeRoute: RoutePlanLeaflet | null = null;

  // Configuração do mapa Leaflet
  center: L.LatLngExpression = [-19.9167, -43.9345]; // Belo Horizonte
  zoom = 12;
  
  options = {
    zoom: 12,
    center: [-19.9167, -43.9345] as L.LatLngExpression,
    zoomControl: true
  };

  layers: L.Layer[] = [];
  map: L.Map | null = null;

  // Depósito (centro logístico) - coordenadas fixas
  depot = { name: 'Centro Logístico', lat: -19.9167, lng: -43.9345 };

  constructor(
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Carregar rotas imediatamente
    this.loadRoutes();
    console.log('Componente inicializado, routesData:', this.routesData.length);
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  loadRoutes(): void {
    // TODO: integrar com rotas reais do backend (VRP solver)
    if (this.routes && this.routes.length > 0) {
      // Se recebeu rotas via Input, usa elas
      this.routesData = [...this.routes];
      if (this.routesData.length > 0 && !this.selectedRouteId) {
        this.selectedRouteId = this.routesData[0].vehicleId;
        this.activeRoute = this.routesData[0];
        // Aguardar mapa estar pronto antes de renderizar
        if (this.map) {
          this.onRouteChange();
        }
      }
      this.cdr.detectChanges();
    } else {
      // Caso contrário, busca do serviço
      console.log('Buscando rotas do serviço...');
      const subscription = this.dashboardService.getRoutesForToday().subscribe({
        next: (routes) => {
          console.log('Rotas recebidas do serviço:', routes?.length || 0, 'rotas', routes);
          if (routes && Array.isArray(routes) && routes.length > 0) {
            // Criar nova referência para garantir detecção de mudanças
            this.routesData = routes.map(r => ({ ...r }));
            console.log('routesData atualizado:', this.routesData.length, 'rotas');
            console.log('Primeira rota:', this.routesData[0]?.vehicleName);
            
            if (!this.selectedRouteId && this.routesData.length > 0) {
              this.selectedRouteId = this.routesData[0].vehicleId;
              this.activeRoute = this.routesData[0];
              console.log('Rota selecionada:', this.selectedRouteId);
            }
            
            // Forçar detecção de mudanças
            this.cdr.markForCheck();
            this.cdr.detectChanges();
            
            // Aguardar mapa estar pronto antes de renderizar
            if (this.map) {
              this.onRouteChange();
            }
          } else {
            console.warn('Nenhuma rota recebida do serviço ou array vazio', routes);
            this.routesData = [];
            this.cdr.markForCheck();
            this.cdr.detectChanges();
          }
        },
        error: (error) => {
          console.error('Erro ao carregar rotas:', error);
          this.routesData = [];
          this.cdr.markForCheck();
          this.cdr.detectChanges();
        },
        complete: () => {
          console.log('Subscribe completo');
        }
      });
      
      // Armazenar subscription para cleanup (opcional, mas boa prática)
      // Note: Em um cenário real, você pode querer usar takeUntil ou similar
    }
  }

  onMapReady(map: L.Map): void {
    this.map = map;
    
    // Adicionar tile layer do OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
    
    this.initializeMap();
    
    // Se já houver rota selecionada, renderiza agora que o mapa está pronto
    if (this.selectedRouteId && this.activeRoute) {
      this.renderRoute(this.activeRoute);
    } else if (this.selectedRouteId) {
      this.onRouteChange();
    }
  }

  initializeMap(): void {
    if (!this.map) return;

    // Adicionar marcador do depósito
    const depotMarker = L.marker([this.depot.lat, this.depot.lng], {
      icon: L.divIcon({
        className: 'depot-marker',
        html: '<div style="font-size: 24px; text-align: center;">🏦</div>',
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      })
    }).bindPopup(this.depot.name);

    this.layers.push(depotMarker);
    depotMarker.addTo(this.map);

    // Se houver rota selecionada, renderiza
    if (this.selectedRouteId && this.activeRoute) {
      this.renderRoute(this.activeRoute);
    }
  }

  onSelectionChange(event: any): void {
    this.selectedRouteId = event.value;
    this.onRouteChange();
  }

  onRouteChange(): void {
    if (!this.selectedRouteId) {
      this.clearMap();
      return;
    }

    const route = this.routesData.find(r => r.vehicleId === this.selectedRouteId);
    
    if (!route) {
      this.clearMap();
      return;
    }

    this.activeRoute = route;
    
    // Se o mapa já estiver pronto, renderiza a rota
    if (this.map) {
      this.renderRoute(route);
    }
  }

  renderRoute(route: RoutePlanLeaflet): void {
    if (!this.map) return;

    // Limpar layers anteriores (exceto o depósito)
    this.layers.forEach(layer => {
      if (layer instanceof L.Marker) {
        const popup = layer.getPopup();
        if (popup?.getContent() !== this.depot.name) {
          layer.remove();
        }
      } else if (layer instanceof L.Polyline) {
        layer.remove();
      }
    });

    // Filtrar layers para manter apenas o depósito
    this.layers = this.layers.filter(layer => {
      if (layer instanceof L.Marker) {
        const popup = layer.getPopup();
        return popup?.getContent() === this.depot.name;
      }
      return false;
    });

    // Adicionar marcadores das agências
    route.stops.forEach((stop, index) => {
      const marker = L.marker([stop.lat, stop.lng], {
        icon: L.divIcon({
          className: 'agency-marker',
          html: `<div style="background-color: ${route.color}; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px;">${index + 1}</div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        })
      }).bindPopup(stop.name);

      marker.addTo(this.map!);
      this.layers.push(marker);
    });

    // Criar polyline da rota
    const routePath = route.stops.map(stop => [stop.lat, stop.lng] as [number, number]);
    const polyline = L.polyline(routePath, {
      color: route.color,
      weight: 4,
      opacity: 0.8
    });

    polyline.addTo(this.map);
    this.layers.push(polyline);

    // Ajustar bounds para mostrar toda a rota
    if (route.stops.length > 0) {
      const bounds = L.latLngBounds(route.stops.map(s => [s.lat, s.lng] as [number, number]));
      this.map.fitBounds(bounds, { padding: [50, 50] });
    }
  }

  clearMap(): void {
    if (!this.map) return;

    // Remover todos os layers exceto o depósito
    this.layers.forEach(layer => {
      if (layer instanceof L.Marker) {
        const popup = layer.getPopup();
        if (popup?.getContent() !== this.depot.name) {
          layer.remove();
        }
      } else if (layer instanceof L.Polyline) {
        layer.remove();
      }
    });

    // Filtrar layers para manter apenas o depósito
    this.layers = this.layers.filter(layer => {
      if (layer instanceof L.Marker) {
        const popup = layer.getPopup();
        return popup?.getContent() === this.depot.name;
      }
      return false;
    });
    
    this.activeRoute = null;
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }
}

