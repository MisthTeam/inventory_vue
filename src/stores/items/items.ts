import { api } from "@/utils/api";
import { defineStore } from "pinia";
import { array_column } from "@/utils/helpers";
import { stringify } from "qs";
import { addItemParams, DashboardInfo, fetchItemsParams, Item, ItemState } from "./types";
import { ApiResponse } from "@/interfaces/api.interface";
import { dashes, items, sleep, statuses } from "@/mocks";

const useItemsStore = defineStore({
  id: "items",

  state: () => ({
    items: {
      data: [],
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

      if (params.filter?.firstHhz || params.filter?.secondHhz) {
        params.filter.hhz =
          params.filter.firstHhz && params.filter.secondHhz
            ? [String(params.filter.firstHhz), String(params.filter.secondHhz)]
            : params.filter.firstHhz || params.filter.secondHhz;

        delete params.filter.firstHhz;
        delete params.filter.secondHhz;
      }
      await sleep(250);
      // const response = await api.get<ApiResponse, ItemState>(
      //   `items?${stringify(params, {
      //     skipNulls: true,
      //   })}`,
      // );
      return (this.items = items);
    },

    async createItem(dto: addItemParams): Promise<Item> {
      // const response = await api.post<ApiResponse, Item>("items", {
      //   ...dto,
      // });
      await sleep(250);
      const item = items.data[0] as unknown as Item;
      return item;
    },

    async getItem(id: number): Promise<Item | null> {
      await sleep(250);
      const item = items.data.find((item) => item.id === id);
      if (!item) return null;
      return item;
    },

    async deleteItem(id: number) {
      await sleep(250);
      // await api.delete<ApiResponse>(`admin/items/${id}`);
    },

    async getItemsInfo() {
      await sleep(230);
      return dashes;
    },

    async editItem(id: number, item: Item) {
      await sleep(250);
      const findItem = items.data.find((it) => it.id === id);
      if (!findItem) return;

      const newStatus = statuses.find((status) => status.id === item.status.id);

      Object.assign(findItem, {
        meta: item.meta,
        attr: array_column(item.attributes, "value", "id"),
        status: newStatus,
      });
      // await api.put<ApiResponse>(`admin/items/${Number(id)}`, {
      //   meta: item.meta,
      //   attr: array_column(item.attributes, "value", "id"),
      //   status: item.status.id,
      // });
    },
  },
});

export default useItemsStore;
