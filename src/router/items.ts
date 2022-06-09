export default [
  {
    path: "/items",
    name: "Items",
    component: () => import("@/views/Items/ItemsView.vue"),
    meta: { role: "items:control" },
  },
  {
    path: "/items/add",
    name: "AddItem",
    component: () => import("@/views/Items/AddItem.vue"),
    meta: { role: "items:control" },
  },
  {
    path: "/items/:id",
    name: "Iteminfo",
    component: () => import("@/views/Items/ItemView.vue"),
    meta: { role: "items:control" },
  },
];
