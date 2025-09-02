import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", redirect: "/user-table" },
  {
    path: "/user-table",
    name: "Table",
    component: () => import("../components/UserTable.vue")
  },
  {
    path: "/itd",
    name: "Itd",
    component: () => import("../components/Itd.vue")
  },
  {
    path: "/user-detail/:id",
    name: "UserDetail",
    component: () => import("../components/UserDetail.vue")
  },

  {
    path: "/add-user",
    name: "UserForm",
    component: () => import("../components/UserForm.vue")
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
