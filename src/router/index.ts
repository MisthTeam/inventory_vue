import { checkUserRole } from "@/hooks/user";
import { useUserStore } from "@/stores";
import { createRouter, createWebHistory } from "vue-router";
import authRoutes from "./auth";
import itemsRoutes from "./items";
import adminRouters from "./admin";
import NProgress from "nprogress";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Dashboard",
      component: () => import("@/views/Home/HomeView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("@/views/Home/NotFound.vue"),
    },

    ...authRoutes,
    ...itemsRoutes,
    ...adminRouters,
  ],
  linkActiveClass: "active",
});

router.beforeResolve((to, _from, next) => {
  if (to.name) NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

router.beforeEach(async (to) => {
  const auth = useUserStore();

  if (!auth.isLoggenIn) {
    await tryAuth();
  }

  if (!to.meta?.guest && !auth.isLoggenIn) return { name: "auth.login" };
  return true;
});

const tryAuth = async () => {
  const auth = useUserStore();
  const token: string | null = localStorage.getItem("Authorization");
  if (token) {
    auth.setBearerToken(token);
    await auth.fetchUserData();
  }
};

export default router;
