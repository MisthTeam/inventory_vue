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
      const { response } = await api.get(`items/test?${stringify(params)}`);
      this.items = response;
      return this.items;
    },
    async createItem(payload) {
      const { response } = await api.post("items", {
        ...payload.dto,
        attr: array_column(payload.attr, "value", "id"),
      });
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
      await api.put(`admin/items/${Number(id)}`, {
        meta: itemRef.meta,
        attr: array_column(itemRef.attributes, "value", "id"),
        status: itemRef.status.id,
      });
    },
  },
});

export default useItemsStore;
