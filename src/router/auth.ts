import { useUserStore } from "@/stores";

export default [
  {
    path: "/login",
    name: "auth.login",
    component: () => import("@/views/Auth/LoginView.vue"),
    meta: { guest: true },
  },
  {
    path: "/register",
    name: "auth.register",
    component: () => import("@/views/Auth/RegisterView.vue"),
    meta: { guest: true },
  },
  {
    path: "/logout",
    name: "auth.logout",
    redirect: async () => {
      const userStore = useUserStore();
      await userStore.logout();
      return { name: "auth.login" };
    },
  },
];
