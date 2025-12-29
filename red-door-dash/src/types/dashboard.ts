export type WeeklyKpi = {
  weekEnding: string;
  occupiedUnits: number;
  occupancyPct: number;
  totalLeasedRent: number;
  averageRent: number;
  totalCollections: number;
  collectionPct: number;
};

export type PropertyKpiSheet = {
  propertyId: string;
  propertyName: string;
  unitCount: number;
  kpis: WeeklyKpi[];
};

export type MonthlySummary = {
  month: string;
  revenue: number | null;
  expenses: number | null;
  netIncome: number | null;
};

export type DashboardTotals = {
  projectedMonthlyRevenue: number;
  projectedMonthlyExpenses: number;
  projectedMonthlyNetIncome: number;
  projectedAnnualRevenue: number;
  projectedAnnualExpenses: number;
  projectedAnnualNetIncome: number;
  monthlySummaries: MonthlySummary[];
  notes: string[];
};

export type PortfolioData = {
  asOfDate: string;
  dashboard: DashboardTotals;
  properties: PropertyKpiSheet[];
};
