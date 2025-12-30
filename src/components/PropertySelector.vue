<script setup lang="ts">
import type { PropertyKpiSheet } from "../types/dashboard";

const props = defineProps<{ properties: PropertyKpiSheet[] }>();
</script>

<template>
  <div id="properties" class="property-panel">
    <h3>Properties</h3>
    <ul class="property-list property-list-compact">
      <li v-for="property in props.properties" :key="property.propertyId">
        <RouterLink :to="`/property/${property.propertyId}`">
          {{ property.propertyName }}
        </RouterLink>
        <span class="muted">{{ property.unitCount }} units</span>
      </li>
    </ul>
  </div>
</template>
