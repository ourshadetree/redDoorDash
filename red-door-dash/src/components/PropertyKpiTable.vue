<script setup lang="ts">
import type { WeeklyKpi } from "../types/dashboard";

const props = defineProps<{ rows: WeeklyKpi[] }>();

const formatPct = (value: number): string => `${(value * 100).toFixed(1)}%`;

const formatMoney = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
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
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in props.rows" :key="row.weekEnding">
          <td>{{ row.weekEnding }}</td>
          <td>{{ row.occupiedUnits }}</td>
          <td>{{ formatPct(row.occupancyPct) }}</td>
          <td>{{ formatMoney(row.totalLeasedRent) }}</td>
          <td>{{ formatMoney(row.averageRent) }}</td>
          <td>{{ formatMoney(row.totalCollections) }}</td>
          <td>{{ formatPct(row.collectionPct) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
