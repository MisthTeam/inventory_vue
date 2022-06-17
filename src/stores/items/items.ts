import { api } from "@/utils/api";
import { defineStore } from "pinia";
import { array_column } from "@/utils/helpers";
import { stringify } from "qs";
import { addItemParams, AttributeField, fetchItemsParams, Item, ItemState } from "./types";
import { ApiResponse } from "@/interfaces/api.interface";

const useItemsStore = defineStore({
  id: "items",

  state: () => ({
    items: {
      data: [] || null,
    } as ItemState,
  }),
  getters: {
    getAllItems: (state) => state.items.data,
    getItemById: (state) => {
      return (itemId: number) => state.items.data && state.items.data.find((item) => item.id === Number(itemId));
    },
  },
  actions: {
    async getItems(params: fetchItemsParams) {
      if (!params.type) {
        delete params.type;
      }
      if (!params.search) {
        delete params.search;
      }
      const response = await api.get<ApiResponse, ItemState>(`items?${stringify(params)}`);
      return (this.items = response);
    },

    async createItem(dto: addItemParams): Promise<Item> {
      const response = await api.post<ApiResponse, Item>("items", {
        ...dto,
      });
      return response;
    },

    async getItem(id: number): Promise<Item | null> {
      const response = await api.get<ApiResponse, Item>(`items/${id}`);
      return response;
    },

    async deleteItem(id: number) {
      await api.delete<ApiResponse>(`admin/items/${id}`);
    },

    async editItem(id: number, item: Item) {
      await api.put<ApiResponse>(`admin/items/${Number(id)}`, {
        meta: item.meta,
        attr: array_column(item.attributes, "value", "id"),
        status: item.status.id,
      });
    },

    async getAttributesByType(device_type: string): Promise<Array<AttributeField>> {
      const response = await api.get<ApiResponse, Array<AttributeField>>(`attr/type/${device_type}`);
      return response;
    },
  },
});

export default useItemsStore;
