import ItemComponent from "@/components/ItemComponent.vue";

export default [
  {
    path: "/items",
    name: "Items",
    component: ItemComponent,
    children: [
      {
        path: "",
        component: () => import("@/views/Items/IndexView.vue"),
      },
      {
        path: "add",
        name: "AddItem",
        component: () => import("@/views/Items/AddItem.vue"),
      },
    ],
  },
  {
    path: "/item/:id",
    name: "Item",
    component: ItemComponent,
    children: [
      {
        path: "",
        name: "Iteminfo",
        component: () => import("@/views/Items/ViewItem.vue"),
      },
      {
        path: "edit",
        name: "EditItem",
        component: () => import("@/views/Items/EditItem.vue"),
      },
      {
        path: "delete",
        name: "DeleteItem",
        component: () => import("@/views/Items/DeleteItem.vue"),
      },
    ],
  },
];
