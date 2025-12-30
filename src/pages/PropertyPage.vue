<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import PropertyKpiTable from "../components/PropertyKpiTable.vue";
import { usePortfolioData } from "../stores/portfolioStore";

const route = useRoute();
const portfolio = usePortfolioData();

const property = computed(() =>
  portfolio.properties.find((item) => item.propertyId === route.params.propertyId)
);
</script>

<template>
  <div class="page">
    <header class="page-header">
      <div>
        <h1>{{ property?.propertyName || "Property" }}</h1>
        <p class="muted">{{ property?.unitCount || 0 }} units</p>
      </div>
      <RouterLink class="back-link" to="/">Back to Dashboard</RouterLink>
    </header>

    <section v-if="property" class="card">
      <h2>Weekly KPIs</h2>
      <PropertyKpiTable :rows="property.kpis" />
    </section>

    <section v-else class="card">
      <h2>Property not found</h2>
      <p class="muted">Check the property link and try again.</p>
    </section>
  </div>
</template>
