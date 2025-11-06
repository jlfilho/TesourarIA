export interface DeliveryPlan {
  id: string;
  agency: string;
  agencyCode: string;
  date: Date;
  volume: number;
  status: 'planejada' | 'em_rota' | 'concluida';
}

