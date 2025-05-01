import { defineStore } from "pinia";

import { api } from "@/utils/api";
import { Item } from "../items/types";
import { ApiResponse } from "@/interfaces/api.interface";
import { sleep } from "@/mocks";

const useSearchStore = defineStore({
  id: "search",
  state: () => ({
    items: [] as Item[],
  }),
  actions: {
    async getItemsInSearch(text: string) {
      // const response = await api.post<ApiResponse, Item[]>("search", {
      //   text,
      // });
      await sleep(250);

      // this.items = response;
      return null;
    },
  },
});

export default useSearchStore;
