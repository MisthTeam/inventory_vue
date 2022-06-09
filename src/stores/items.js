import { api } from "@/utils/api";
import { defineStore } from "pinia";
import { array_column } from "@/utils/helpers";
import { stringify } from "qs";

const useItemsStore = defineStore({
  id: "items",

  state: () => ({
    items: {
      data: [] || null,
    },
  }),
  getters: {
    getAllItems: (state) => state.items.data,
    getItemById: (state) => {
      return (itemId) =>
        state.items &&
        state.items.data.find((item) => item.id === Number(itemId));
    },
  },
  actions: {
    async getItems(params) {
      if (!params.type) {
        delete params.type;
      }
      if (!params.search) {
        delete params.search;
      }
      return (this.items = await api.get(`items/test?${stringify(params)}`));
    },
    async createItem({ dto }) {
      return await api.post("items", {
        ...dto,
      });
    },
    async getItem(id) {
      return await api.get(`items/${id}`);
    },
    async deleteItem(id) {
      await api.delete(`admin/items/${Number(id)}`);
    },
    async editItem(id, item) {
      await api.put(`admin/items/${Number(id)}`, {
        meta: item.meta,
        attr: array_column(item.attributes, "value", "id"),
        status: item.status.id,
      });
    },
  },
});

export default useItemsStore;
