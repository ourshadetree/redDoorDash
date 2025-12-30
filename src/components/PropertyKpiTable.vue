<script setup lang="ts">
import type { PropertyKpiRow } from "../types/dashboard";

const props = defineProps<{ rows: PropertyKpiRow[] }>();

const formatPct = (value?: number | null): string =>
  value === null || value === undefined ? "—" : `${(value * 100).toFixed(1)}%`;

const formatMoney = (value?: number | null): string => {
  if (value === null || value === undefined) {
    return "—";
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
};

const formatWeekLabel = (value: string, rowType: PropertyKpiRow["rowType"]): string => {
  if (rowType !== "weekly") {
    return value;
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(date);
};

const rowClass = (rowType: PropertyKpiRow["rowType"]): string => {
  if (rowType === "monthlyTarget") {
    return "row-target";
  }
  if (rowType === "annualTotal") {
    return "row-annual";
  }
  return "";
};
</script>

<template>
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Week Ending Sunday</th>
          <th># Occupied Units</th>
          <th>Occupancy %</th>
          <th>Total Leased Rent $</th>
          <th>Average Rent</th>
          <th>Total Collections $</th>
          <th>Collection %</th>
          <th>Actual Revenue</th>
          <th>Budgeted Revenue</th>
          <th>Variance $</th>
          <th>Variance %</th>
          <th>Actual Expense</th>
          <th>Budgeted Expense</th>
          <th>Variance $</th>
          <th>Variance %</th>
          <th>Net Income</th>
          <th>Net Income Budgeted</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in props.rows"
          :key="`${row.weekEnding}-${row.rowType}`"
          :class="rowClass(row.rowType)"
        >
          <td>{{ formatWeekLabel(row.weekEnding, row.rowType) }}</td>
          <td>{{ row.occupiedUnits ?? "—" }}</td>
          <td>{{ formatPct(row.occupancyPct) }}</td>
          <td>{{ formatMoney(row.totalLeasedRent) }}</td>
          <td>{{ formatMoney(row.averageRent) }}</td>
          <td>{{ formatMoney(row.totalCollections) }}</td>
          <td>{{ formatPct(row.collectionPct) }}</td>
          <td>{{ formatMoney(row.monthlyActualRevenue) }}</td>
          <td>{{ formatMoney(row.monthlyBudgetedRevenue) }}</td>
          <td>{{ formatMoney(row.monthlyRevenueVariance) }}</td>
          <td>{{ formatPct(row.monthlyRevenueVariancePct) }}</td>
          <td>{{ formatMoney(row.monthlyActualExpense) }}</td>
          <td>{{ formatMoney(row.monthlyBudgetedExpense) }}</td>
          <td>{{ formatMoney(row.monthlyExpenseVariance) }}</td>
          <td>{{ formatPct(row.monthlyExpenseVariancePct) }}</td>
          <td>{{ formatMoney(row.monthlyNetIncome) }}</td>
          <td>{{ formatMoney(row.monthlyNetIncomeBudgeted) }}</td>
          <td>{{ row.note ?? "—" }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
