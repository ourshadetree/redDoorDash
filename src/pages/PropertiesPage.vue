<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import PropertyKpiTable from "../components/PropertyKpiTable.vue";
import { usePortfolioData } from "../stores/portfolioStore";
import type { PropertyKpiRow, PropertyKpiSheet } from "../types/dashboard";

const portfolio = usePortfolioData();
const route = useRoute();
const router = useRouter();

const defaultPropertyId = portfolio.properties[0]?.propertyId ?? "";
const selectedId = ref(String(route.query.propertyId ?? defaultPropertyId));

watch(
  () => route.query.propertyId,
  (value) => {
    if (typeof value === "string") {
      selectedId.value = value;
    }
  }
);

const property = computed<PropertyKpiSheet | undefined>(() =>
  portfolio.properties.find((item) => item.propertyId === selectedId.value)
);

const annualTotals = computed<PropertyKpiRow | undefined>(() =>
  property.value?.kpis.find((row) => row.rowType === "annualTotal")
);

const monthlyTargets = computed<PropertyKpiRow[]>(() =>
  property.value?.kpis.filter((row) => row.rowType === "monthlyTarget") ?? []
);

const latestMonthly = computed<PropertyKpiRow | undefined>(() => {
  if (!monthlyTargets.value.length) {
    return undefined;
  }
  return monthlyTargets.value[monthlyTargets.value.length - 1];
});

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

const formatPct = (value?: number | null): string => {
  if (value === null || value === undefined) {
    return "—";
  }
  return `${(value * 100).toFixed(1)}%`;
};

const trackStatus = (variance?: number | null): string => {
  if (variance === null || variance === undefined) {
    return "Unknown";
  }
  return variance >= 0 ? "On track" : "Off track";
};

const trackClass = (variance?: number | null): string => {
  if (variance === null || variance === undefined) {
    return "status status--neutral";
  }
  return variance >= 0 ? "status status--good" : "status status--bad";
};

const handleSelect = (event: Event): void => {
  const value = (event.target as HTMLSelectElement).value;
  selectedId.value = value;
  router.replace({ name: "properties", query: { propertyId: value } });
};

const annualNetVariance = computed<number | null>(() => {
  const actual = annualTotals.value?.monthlyNetIncome;
  const target = annualTotals.value?.monthlyNetIncomeBudgeted;
  if (actual === null || actual === undefined || target === null || target === undefined) {
    return null;
  }
  return actual - target;
});

const monthlyNetVariance = computed<number | null>(() => {
  const actual = latestMonthly.value?.monthlyNetIncome;
  const target = latestMonthly.value?.monthlyNetIncomeBudgeted;
  if (actual === null || actual === undefined || target === null || target === undefined) {
    return null;
  }
  return actual - target;
});
</script>

<template>
  <div class="page">
    <header class="page-header">
      <div>
        <h1>Properties</h1>
        <p class="muted">Select a property to view targets and weekly performance.</p>
      </div>
      <div class="select-wrap">
        <label class="label" for="property-select">Property</label>
        <select id="property-select" :value="selectedId" @change="handleSelect">
          <option v-for="item in portfolio.properties" :key="item.propertyId" :value="item.propertyId">
            {{ item.propertyName }}
          </option>
        </select>
      </div>
    </header>

    <section v-if="property" class="card">
      <div class="overview-header">
        <div>
          <h2>{{ property.propertyName }}</h2>
          <p class="muted">{{ property.unitCount }} units</p>
        </div>
        <div class="status-group">
          <span class="status-title">Yearly status</span>
          <span :class="trackClass(annualNetVariance)">
            {{ trackStatus(annualNetVariance) }}
          </span>
        </div>
      </div>

      <div class="overview-grid">
        <div class="overview-card">
          <h3>Yearly vs Target</h3>
          <div class="overview-row">
            <span class="muted">Revenue</span>
            <strong>{{ formatMoney(annualTotals?.monthlyActualRevenue) }}</strong>
            <span class="muted">Target {{ formatMoney(annualTotals?.monthlyBudgetedRevenue) }}</span>
          </div>
          <div class="overview-row">
            <span class="muted">Expenses</span>
            <strong>{{ formatMoney(annualTotals?.monthlyActualExpense) }}</strong>
            <span class="muted">Target {{ formatMoney(annualTotals?.monthlyBudgetedExpense) }}</span>
          </div>
          <div class="overview-row">
            <span class="muted">Net Income</span>
            <strong>{{ formatMoney(annualTotals?.monthlyNetIncome) }}</strong>
            <span class="muted">Target {{ formatMoney(annualTotals?.monthlyNetIncomeBudgeted) }}</span>
          </div>
        </div>

        <div class="overview-card">
          <h3>Latest Month vs Target</h3>
          <div class="overview-row">
            <span class="muted">Revenue</span>
            <strong>{{ formatMoney(latestMonthly?.monthlyActualRevenue) }}</strong>
            <span class="muted">
              Var {{ formatMoney(latestMonthly?.monthlyRevenueVariance) }}
              ({{ formatPct(latestMonthly?.monthlyRevenueVariancePct) }})
            </span>
          </div>
          <div class="overview-row">
            <span class="muted">Expenses</span>
            <strong>{{ formatMoney(latestMonthly?.monthlyActualExpense) }}</strong>
            <span class="muted">
              Var {{ formatMoney(latestMonthly?.monthlyExpenseVariance) }}
              ({{ formatPct(latestMonthly?.monthlyExpenseVariancePct) }})
            </span>
          </div>
          <div class="overview-row">
            <span class="muted">Net Income</span>
            <strong>{{ formatMoney(latestMonthly?.monthlyNetIncome) }}</strong>
            <span class="muted">
              Var {{ formatMoney(monthlyNetVariance) }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <section v-if="property" class="card">
      <h2>Weekly KPIs</h2>
      <PropertyKpiTable :rows="property.kpis" />
    </section>
  </div>
</template>
