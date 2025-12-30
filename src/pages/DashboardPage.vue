<script setup lang="ts">
import DashboardCharts from "../components/DashboardCharts.vue";
import DashboardTotals from "../components/DashboardTotals.vue";
import { usePortfolioData } from "../stores/portfolioStore";

const portfolio = usePortfolioData();
</script>

<template>
  <div class="page dashboard-page">
    <section class="card dashboard-widget">
      <div class="dashboard-grid">
        <div class="dashboard-panel dashboard-panel--overview">
          <DashboardTotals :totals="portfolio.dashboard" />
        </div>

        <div class="dashboard-panel dashboard-panel--charts">
          <DashboardCharts
            :monthly-summaries="portfolio.dashboard.monthlySummaries"
            :properties="portfolio.properties"
          />
        </div>
      </div>

      <p class="muted dashboard-footnote">As of {{ portfolio.asOfDate }}</p>
    </section>
  </div>
</template>
