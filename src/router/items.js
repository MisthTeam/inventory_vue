import ItemComponent from "@/components/ItemComponent.vue";
import { checkUserRole } from "@/hooks";
import { useUserStore } from "@/stores";

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
    beforeEnter: () => {
      const userStore = useUserStore();
      const { isHasRole } = checkUserRole(userStore.getUser, "items:control");
      if (!isHasRole.value) return { name: "Dashboard" };
    },
  },
  {
    path: "/items/:id",
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
