<script setup lang="ts">
import DashboardTotals from "../components/DashboardTotals.vue";
import MonthlySummaryTable from "../components/MonthlySummaryTable.vue";
import PropertySelector from "../components/PropertySelector.vue";
import { usePortfolioData } from "../stores/portfolioStore";

const portfolio = usePortfolioData();
</script>

<template>
  <div class="page">
    <header class="page-header">
      <div>
        <h1>Portfolio Dashboard</h1>
        <p class="muted">As of {{ portfolio.asOfDate }}</p>
      </div>
    </header>

    <DashboardTotals :totals="portfolio.dashboard" />

    <section class="card">
      <h2>Notes</h2>
      <ul class="notes">
        <li v-for="note in portfolio.dashboard.notes" :key="note">{{ note }}</li>
      </ul>
    </section>

    <MonthlySummaryTable :summaries="portfolio.dashboard.monthlySummaries" />

    <PropertySelector :properties="portfolio.properties" />
  </div>
</template>
