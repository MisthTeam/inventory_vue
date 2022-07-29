export default [
  {
    path: "/items",
    name: "Items",
    component: () => import("@/views/Items/ItemsView.vue"),
    meta: { role: "items:list", title: "Комплектующие" },
  },
  {
    path: "/items/add",
    name: "AddItem",
    component: () => import("@/views/Items/AddItem.vue"),
    meta: { role: "items:create", title: "Добавить предмет" },
  },
  {
    path: "/items/:id(\\d+)",
    name: "Iteminfo",
    component: () => import("@/views/Items/ItemView.vue"),
    meta: { role: "items:list", title: "Инфо о комплектующем" },
  },
];
