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
        component: () => import("@/components/Items/AddItem.vue"),
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
        component: () => import("@/components/Items/ViewItem.vue"),
      },
      {
        path: "edit",
        name: "EditItem",
        component: () => import("@/components/Items/EditItem.vue"),
      },
      {
        path: "delete",
        name: "DeleteItem",
        component: () => import("@/components/Items/DeleteItem.vue"),
      },
    ],
  },
];
