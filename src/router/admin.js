export default [
  {
    path: "/admin",
    name: "Admin",
    component: () => import("@/views/Admin/ViewAdmin.vue"),
    meta: { role: "items:control" },
  },
  {
    path: "/admin/user/:id",
    name: "admin.user",
    component: () => import("@/views/Admin/ViewUser.vue"),
    meta: { role: "items:control" },
  },
];
