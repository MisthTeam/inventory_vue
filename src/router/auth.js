import AuthView from "@/components/Auth.vue";
import useUserStore from "@/stores/user";

export default [
  {
    path: "/auth",
    name: "Auth",
    component: AuthView,
    children: [
      {
        path: "/login",
        name: "auth.login",
        component: () => import("@/views/auth/LoginView.vue"),
        meta: { guest: true },
      },
      {
        path: "/register",
        name: "auth.register",
        component: () => import("@/views/auth/RegisterView.vue"),
        meta: { guest: true },
      },
      {
        path: "/logout",
        name: "auth.logout",
        redirect: () => {
          const userStore = useUserStore();
          userStore.logout();
          return { name: "auth.login" };
        },
      },
    ],
  },
];
