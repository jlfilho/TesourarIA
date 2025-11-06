export interface RoutePlan {
  id: string;
  vehicle: string;
  distanceKm: number;
  cost: number;
  agencies: string[];
}

export interface RoutePoint {
  lat: number;
  lng: number;
  agencyName: string;
  agencyCode: string;
}

export interface RouteWithCoordinates extends RoutePlan {
  path: (RoutePoint | { lat: number; lng: number; name: string })[];
  depot: { lat: number; lng: number; name: string };
}

// Interface para Leaflet - Rotas do dia
export interface RoutePlanLeaflet {
  vehicleId: string;
  vehicleName: string;
  color: string;
  stops: {
    name: string;
    lat: number;
    lng: number;
  }[];
  distanceKm: number;
  cost: number;
}

