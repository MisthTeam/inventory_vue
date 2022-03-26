import { createRouter, createWebHistory } from "vue-router";
import AuthView from "../components/Auth.vue";

const routes = [
  // {
  //   path: "/",
  //   name: "home",
  //   component: HomeView,
  // },
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
  {
    path: '/auth',
    name: 'Auth',
    component: AuthView,
    children: [
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/views/auth/LoginView.vue'),
        },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
