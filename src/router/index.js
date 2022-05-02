import authRouters from "./auth";
import itemRouters from "./items";
import { useUserStore } from "@/stores";
import NotFound from "@/views/Home/NotFound.vue";
import { createRouter, createWebHistory } from "vue-router";

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
    component: NotFound,
  },

  ...authRouters,
  ...itemRouters,
];

const router = createRouter({
  history: createWebHistory(import.meta.BASE_URL),
  routes,
});

router.beforeEach(async (to) => {
  const auth = useUserStore();
  if (!to.meta?.guest && !auth.isLoggenIn) {
    const token = localStorage.getItem("Authorization");
    if (token) {
      auth.setBearerToken(token);
      const user = await auth.fetchUserData();
      if (user) return { path: to.fullPath };
      return { name: "auth.login" };
    }
    return { name: "auth.login" };
  }
});

export default router;
