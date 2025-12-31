<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import PropertyKpiTable from "../components/PropertyKpiTable.vue";
import { usePortfolioData } from "../stores/portfolioStore";
import type { PropertyKpiSheet } from "../types/dashboard";

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

const handleSelect = (event: Event): void => {
  const value = (event.target as HTMLSelectElement).value;
  selectedId.value = value;
  router.replace({ name: "properties", query: { propertyId: value } });
};
</script>

<template>
  <div class="page">
    <div class="select-wrap">
      <label class="label" for="property-select">Property</label>
      <select id="property-select" :value="selectedId" @change="handleSelect">
        <option v-for="item in portfolio.properties" :key="item.propertyId" :value="item.propertyId">
          {{ item.propertyName }}
        </option>
      </select>
    </div>

    <section v-if="property" class="card">
      <h2>Weekly KPIs</h2>
      <PropertyKpiTable :rows="property.kpis" />
    </section>
  </div>
</template>
