export interface StockRisk {
  id: string;
  agency: string;
  agencyCode: string;
  stockCurrent: number;
  demandForecast: number;
  daysCovered: number;
  level: 'ok' | 'atencao' | 'critico';
}

