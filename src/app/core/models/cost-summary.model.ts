export interface CostSummary {
  date: Date;
  transportCost: number;
  fixedCost: number;
  variableCost: number;
}

export interface DashboardKPIs {
  totalTransportCost: number;
  totalTrips: number;
  coverageAvgDays: number;
  agenciesAtRisk: number;
}

