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
    redirect: () => {
      const userStore = useUserStore();
      userStore.setBearerToken();
      return { name: "auth.login" };
    },
  },
];
