import { createRouter, createWebHistory } from "vue-router";
import DashboardPage from "../pages/DashboardPage.vue";
import PropertiesPage from "../pages/PropertiesPage.vue";
import PropertyPage from "../pages/PropertyPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "dashboard", component: DashboardPage },
    { path: "/properties", name: "properties", component: PropertiesPage },
    { path: "/property/:propertyId", name: "property", component: PropertyPage }
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: "smooth" };
    }
    return { top: 0 };
  }
});

export default router;
