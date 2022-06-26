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
        meta: { page: "device" },
      },
      {
        path: "users",
        name: "AdminUsers",
        component: () => import("@/views/Admin/Users/BaseUsers.vue"),
        meta: { page: "users" },
      },
      {
        path: "users/:id",
        name: "AdminUser",
        component: () => import("@/views/Admin/User/ViewUser.vue"),
        meta: { page: "users" },
      },
      {
        path: "fields",
        name: "AdminInputs",
        component: () => import("@/views/Admin/CustomInputs/ViewInputs.vue"),
        meta: { page: "inputs" },
      },
    ],
    redirect: () => {
      return { name: "AdminDevices" };
    },
  },
];
