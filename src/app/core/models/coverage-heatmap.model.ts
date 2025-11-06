export interface CoverageDay {
  day: string; // 'Seg', 'Ter', ...
  daysCovered: number; // número de dias de cobertura
}

export interface CoverageRow {
  agencyId: string;
  agencyName: string;
  coverageByDay: CoverageDay[];
}

