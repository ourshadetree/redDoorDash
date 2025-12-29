<script setup lang="ts">
import type { PropertyKpiSheet } from "../types/dashboard";

const props = defineProps<{ properties: PropertyKpiSheet[] }>();
</script>

<template>
  <section id="properties" class="card">
    <h2>Properties</h2>
    <ul class="property-list">
      <li v-for="property in props.properties" :key="property.propertyId">
        <RouterLink :to="`/property/${property.propertyId}`">
          {{ property.propertyName }}
        </RouterLink>
        <span class="muted">{{ property.unitCount }} units</span>
      </li>
    </ul>
  </section>
</template>
