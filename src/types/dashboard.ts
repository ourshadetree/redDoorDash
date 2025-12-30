export type PropertyKpiRow = {
  rowType: "weekly" | "monthlyTarget" | "annualTotal";
  weekEnding: string;
  occupiedUnits?: number;
  occupancyPct?: number;
  totalLeasedRent?: number;
  averageRent?: number;
  totalCollections?: number;
  collectionPct?: number;
  monthlyActualRevenue?: number | null;
  monthlyBudgetedRevenue?: number | null;
  monthlyRevenueVariance?: number | null;
  monthlyRevenueVariancePct?: number | null;
  monthlyActualExpense?: number | null;
  monthlyBudgetedExpense?: number | null;
  monthlyExpenseVariance?: number | null;
  monthlyExpenseVariancePct?: number | null;
  monthlyNetIncome?: number | null;
  monthlyNetIncomeBudgeted?: number | null;
  note?: string;
};

export type PropertyKpiSheet = {
  propertyId: string;
  propertyName: string;
  unitCount: number;
  kpis: PropertyKpiRow[];
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
