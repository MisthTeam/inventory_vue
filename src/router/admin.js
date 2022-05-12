export default [
  {
    path: "/admin",
    name: "Admin",
    component: () => import("@/views/Admin/ViewAdmin.vue"),
    meta: { role: "items:control" },
  },
];
