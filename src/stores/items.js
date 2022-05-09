import { api } from "@/utils/api";
import { defineStore } from "pinia";
import { array_column } from "@/utils/helpers";

const useItemsStore = defineStore({
  id: "items",

  state: () => ({
    items: [] || null,
  }),
  getters: {
    getAllItems: (state) => state.items,
    getItemById: (state) => {
      return (itemId) =>
        state.items && state.items.find((item) => item.id === Number(itemId));
    },
  },
  actions: {
    async getItems() {
      const data = await api.get("items");
      this.items = data.items;
      return this.items;
    },
    async createItem(payload) {
      const data = await api.post("items", payload);
      return data;
    },
    async getItem(id) {
      const data = await api.get(`items/${id}`);
      return data;
    },
    async deleteItem(id) {
      await api.delete(`admin/items/${Number(id)}`);
    },
    async editItem(id, itemRef) {
      const { item } = await api.put(`admin/items/${Number(id)}`, {
        meta: itemRef.meta,
        attr: array_column(itemRef.attributes, "value", "id"),
      });
      return item;
    },
  },
});

export default useItemsStore;
