export default [
  {
    path: "/admin",
    name: "Admin",
    component: () => import("@/views/Admin/ViewAdmin.vue"),
    meta: { role: "items:control", title: "Админка" },
    children: [
      {
        path: "device",
        name: "AdminDevices",
        component: () => import("@/views/Admin/Devices/BaseDevices.vue"),
        meta: { page: "device", role: "devices:list" },
      },
      {
        path: "users",
        name: "AdminUsers",
        component: () => import("@/views/Admin/Users/BaseUsers.vue"),
        meta: { page: "users", role: "users:list" },
      },
      {
        path: "users/:id",
        name: "AdminUser",
        component: () => import("@/views/Admin/User/ViewUser.vue"),
        meta: { page: "users", role: "users:list" },
      },
      {
        path: "fields",
        name: "AdminInputs",
        component: () => import("@/views/Admin/Attributes/ViewAttributes.vue"),
        meta: { page: "inputs", role: "attr:list" },
      },
    ],
    redirect: () => {
      return { name: "AdminDevices" };
    },
  },
];
