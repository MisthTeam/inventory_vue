export default [
  {
    path: "/admin",
    name: "Admin",
    component: () => import("@/views/Admin/ViewAdmin.vue"),
    meta: { role: "items:control" },
    children: [
      {
        path: "device",
        name: "AdminDevices",
        component: () => import("@/views/Admin/Devices/BaseDevices.vue"),
      },
      {
        path: "users",
        name: "AdminUsers",
        component: () => import("@/views/Admin/Users/BaseUsers.vue"),
      },
      {
        path: "users/:id",
        name: "AdminUser",
        component: () => import("@/views/Admin/User/ViewUser.vue"),
      },
    ],
    redirect: () => {
      return { name: "AdminDevices" };
    },
  },
];
