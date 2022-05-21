import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Main",
    component: () => import("@/views/MainView.vue"),
    meta: {
      title: "主頁",
    },
  },
  {
    path: "/:id",
    name: "DetailAndExcel",
    component: () => import("@/views/CreatedExcelView.vue"),
    meta: {
      title: "細節",
    },
  },

  {
    path: "/invoice",
    name: "Invoice",
    component: () => import("@/views/EnterView.vue"),
    meta: {
      title: "輸入發票",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.afterEach((to) => {
  document.title = `市政府會計系統 | ${to.meta.title}`;
});

export default router;
