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
      const { response } = await api.get("items");
      this.items = response;
      return this.items;
    },
    async createItem(payload) {
      const { response } = await api.post("items", payload);
      return response;
    },
    async getItem(id) {
      const { response } = await api.get(`items/${id}`);
      return response;
    },
    async deleteItem(id) {
      await api.delete(`admin/items/${Number(id)}`);
    },
    async editItem(id, itemRef) {
      const { response } = await api.put(`admin/items/${Number(id)}`, {
        meta: itemRef.meta,
        attr: array_column(itemRef.attributes, "value", "id"),
        status: itemRef.status.id,
      });
      return response;
    },
  },
});

export default useItemsStore;
