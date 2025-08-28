import { createRouter, createWebHistory } from "vue-router";
import TechnicalTask from "../components/TechnicalTask.vue";
import Itd from "../components/Itd.vue";

const routes = [
  { path: "/", component: TechnicalTask, name: "TechnicalTask" },
  { path: "/table", component: TechnicalTask, name: "Table" },
  { path: "/itd", component: Itd, name: "Itd" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
