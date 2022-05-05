import { api } from "@/utils/api";
import { defineStore } from "pinia";

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
  },
});

export default useItemsStore;
