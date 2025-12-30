<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import Chart from "chart.js/auto";
import type { MonthlySummary, PropertyKpiSheet } from "../types/dashboard";

const props = defineProps<{
  monthlySummaries: MonthlySummary[];
  properties: PropertyKpiSheet[];
}>();

const monthlyCanvas = ref<HTMLCanvasElement | null>(null);
const weeklyCanvas = ref<HTMLCanvasElement | null>(null);

let monthlyChart: Chart | null = null;
let weeklyChart: Chart | null = null;

const formatWeekLabel = (value: string): string => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(date);
};

const buildMonthlyChart = (): void => {
  if (!monthlyCanvas.value) {
    return;
  }
  if (monthlyChart) {
    monthlyChart.destroy();
  }

  const labels = props.monthlySummaries.map((summary) => summary.month.slice(0, 3));
  const revenue = props.monthlySummaries.map((summary) => summary.revenue);
  const expenses = props.monthlySummaries.map((summary) => summary.expenses);
  const netIncome = props.monthlySummaries.map((summary) => summary.netIncome);

  monthlyChart = new Chart(monthlyCanvas.value, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Revenue",
          data: revenue,
          borderColor: "#c0392b",
          backgroundColor: "rgba(192, 57, 43, 0.12)",
          tension: 0.3,
          pointRadius: 3
        },
        {
          label: "Expenses",
          data: expenses,
          borderColor: "#3f4d59",
          backgroundColor: "rgba(63, 77, 89, 0.12)",
          tension: 0.3,
          pointRadius: 3
        },
        {
          label: "Net Income",
          data: netIncome,
          borderColor: "#d88921",
          backgroundColor: "rgba(216, 137, 33, 0.12)",
          tension: 0.3,
          pointRadius: 3
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top"
        }
      },
      scales: {
        y: {
          ticks: {
            callback: (value) =>
              new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0
              }).format(Number(value))
          }
        }
      }
    }
  });
};

const buildWeeklyChart = (): void => {
  if (!weeklyCanvas.value) {
    return;
  }
  if (weeklyChart) {
    weeklyChart.destroy();
  }

  const weeklyMap = new Map<
    string,
    { leased: number; collections: number; occupied: number; units: number }
  >();

  props.properties.forEach((property) => {
    property.kpis
      .filter((kpi) => (kpi.rowType ?? "weekly") === "weekly")
      .forEach((kpi) => {
      const existing = weeklyMap.get(kpi.weekEnding) ?? {
        leased: 0,
        collections: 0,
        occupied: 0,
        units: 0
      };
      existing.leased += kpi.totalLeasedRent ?? 0;
      existing.collections += kpi.totalCollections ?? 0;
      existing.occupied += kpi.occupiedUnits ?? 0;
      existing.units += property.unitCount;
      weeklyMap.set(kpi.weekEnding, existing);
      });
  });

  const weeklyRows = Array.from(weeklyMap.entries()).sort(
    (a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime()
  );

  const labels = weeklyRows.map(([week]) => formatWeekLabel(week));
  const leased = weeklyRows.map(([, values]) => values.leased);
  const collections = weeklyRows.map(([, values]) => values.collections);
  const occupancy = weeklyRows.map(([, values]) =>
    values.units ? values.occupied / values.units : null
  );

  weeklyChart = new Chart(weeklyCanvas.value, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Leased Rent",
          data: leased,
          borderColor: "#1f6b75",
          backgroundColor: "rgba(31, 107, 117, 0.12)",
          tension: 0.3,
          pointRadius: 3,
          yAxisID: "currency"
        },
        {
          label: "Collections",
          data: collections,
          borderColor: "#8d3a48",
          backgroundColor: "rgba(141, 58, 72, 0.12)",
          tension: 0.3,
          pointRadius: 3,
          yAxisID: "currency"
        },
        {
          label: "Occupancy %",
          data: occupancy,
          borderColor: "#2d3640",
          backgroundColor: "rgba(45, 54, 64, 0.12)",
          tension: 0.3,
          pointRadius: 3,
          yAxisID: "percent"
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top"
        }
      },
      scales: {
        currency: {
          position: "left",
          ticks: {
            callback: (value) =>
              new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0
              }).format(Number(value))
          }
        },
        percent: {
          position: "right",
          grid: {
            drawOnChartArea: false
          },
          ticks: {
            callback: (value) => `${(Number(value) * 100).toFixed(0)}%`
          },
          min: 0,
          max: 1
        }
      }
    }
  });
};

const renderCharts = (): void => {
  buildMonthlyChart();
  buildWeeklyChart();
};

onMounted(renderCharts);
watch(
  () => [props.monthlySummaries, props.properties],
  () => renderCharts(),
  { deep: true }
);
onBeforeUnmount(() => {
  monthlyChart?.destroy();
  weeklyChart?.destroy();
});
</script>

<template>
  <div class="chart-grid">
    <div class="chart-card">
      <h3>Monthly Performance</h3>
      <p class="muted">Revenue, expenses, and net income across the year.</p>
      <div class="chart-canvas">
        <canvas ref="monthlyCanvas"></canvas>
      </div>
    </div>
    <div class="chart-card">
      <h3>Weekly Leasing vs Collections</h3>
      <p class="muted">Portfolio totals with occupancy rate trend.</p>
      <div class="chart-canvas">
        <canvas ref="weeklyCanvas"></canvas>
      </div>
    </div>
  </div>
</template>
