import { checkUserRole } from "@/hooks/user";
import { useUserStore } from "@/stores";
import { createRouter, createWebHistory } from "vue-router";
import adminRouters from "./admin";
import authRouters from "./auth";
import itemRouters from "./items";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: () => import("@/views/Home/HomeView.vue"),
  },

  // {
  //   path: "/devices",
  //   name: "Devices",
  //   component: ItemComponent,
  //   children: [
  //     {
  //       path: "",
  //       component: () => import("@/views/Items/IndexView.vue"),
  //     },
  //   ],
  // },

  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/Home/NotFound.vue"),
  },

  ...authRouters,
  ...itemRouters,
  ...adminRouters,
];

const router = createRouter({
  history: createWebHistory(import.meta.BASE_URL),
  routes,
});

router.beforeEach(async (to) => {
  const auth = useUserStore();
  if (!to.meta?.guest && !auth.isLoggenIn) {
    const canAccess = await checkAuth();
    if (canAccess) return { path: to.fullPath };
    else return { name: "auth.login", query: { redirect: to.fullPath } };
  }

  if (to.meta?.role && auth.isLoggenIn) {
    const { isHasRole } = checkUserRole(auth.getUser, to.meta.role);
    if (!isHasRole.value) return { name: "Dashboard" };
  }
});

const checkAuth = async () => {
  const auth = useUserStore();
  const token = localStorage.getItem("Authorization");
  if (token) {
    auth.setBearerToken(token);
    const user = await auth.fetchUserData();
    if (user) return true;
  }
  return false;
};

export default router;
