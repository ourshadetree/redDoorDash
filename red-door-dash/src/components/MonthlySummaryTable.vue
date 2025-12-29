<script setup lang="ts">
import type { MonthlySummary } from "../types/dashboard";

const props = defineProps<{ summaries: MonthlySummary[] }>();

const formatMoney = (value: number | null): string => {
  if (value === null) {
    return "--";
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
};
</script>

<template>
  <section class="card">
    <h2>Monthly Summary</h2>
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Revenue</th>
            <th>Expenses</th>
            <th>Net Income</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in props.summaries" :key="row.month">
            <td>{{ row.month }}</td>
            <td>{{ formatMoney(row.revenue) }}</td>
            <td>{{ formatMoney(row.expenses) }}</td>
            <td>{{ formatMoney(row.netIncome) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
