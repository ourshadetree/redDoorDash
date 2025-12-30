<script setup lang="ts">
import type { DashboardTotals } from "../types/dashboard";

const props = defineProps<{ totals: DashboardTotals }>();

const formatMoney = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
};
</script>

<template>
  <div class="totals-grid">
    <div class="stat-card">
      <div class="label">Monthly Revenue</div>
      <div class="value">{{ formatMoney(props.totals.projectedMonthlyRevenue) }}</div>
    </div>
    <div class="stat-card">
      <div class="label">Monthly Expenses</div>
      <div class="value">{{ formatMoney(props.totals.projectedMonthlyExpenses) }}</div>
    </div>
    <div class="stat-card">
      <div class="label">Monthly Net Income</div>
      <div class="value">{{ formatMoney(props.totals.projectedMonthlyNetIncome) }}</div>
    </div>
    <div class="stat-card">
      <div class="label">Annual Revenue</div>
      <div class="value">{{ formatMoney(props.totals.projectedAnnualRevenue) }}</div>
    </div>
    <div class="stat-card">
      <div class="label">Annual Expenses</div>
      <div class="value">{{ formatMoney(props.totals.projectedAnnualExpenses) }}</div>
    </div>
    <div class="stat-card">
      <div class="label">Annual Net Income</div>
      <div class="value">{{ formatMoney(props.totals.projectedAnnualNetIncome) }}</div>
    </div>
  </div>
</template>
