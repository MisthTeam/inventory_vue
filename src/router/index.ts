import { checkUserRole } from "@/hooks/user";
import { useUserStore } from "@/stores";
import { createRouter, createWebHistory } from "vue-router";
import authRoutes from "./auth";
import itemsRoutes from "./items";
import adminRouters from "./admin";
import NProgress from "nprogress";

const routes = [
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
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
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
  if (!to.meta?.guest && !auth.isLoggenIn) {
    const canAccess = await checkAuth();
    if (canAccess) return { path: to.fullPath };
    return { name: "auth.login", query: { redirect: to.fullPath } };
  }

  if (to.meta?.role && auth.isLoggenIn) {
    const { isHasRole } = checkUserRole(auth.getUser, to.meta?.role as string);
    if (!isHasRole.value) return { name: "Dashboard" };
  }
});

const checkAuth = async () => {
  const auth = useUserStore();
  const token: string | null = localStorage.getItem("Authorization");
  if (token) {
    auth.setBearerToken(token);
    const user = await auth.fetchUserData();
    if (user) return true;
  }
  return false;
};

export default router;
