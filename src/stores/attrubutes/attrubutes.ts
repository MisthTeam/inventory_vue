import { defineStore } from "pinia";

import { ApiResponse } from "@/interfaces/api.interface";
import { api } from "@/utils/api";
import { AddAttributeDTO, Attribute, editAttributeDTO } from "./types";
import { attrubetsList, sleep } from "@/mocks";

const useAttributesStore = defineStore({
  id: "attributes",
  state: () => ({
    attributes: [] as Attribute[],
  }),
  actions: {
    async getAttrubtes() {
      await sleep(250);
      // const reponse = await api.get<ApiResponse, Attribute[]>("attr");
      return attrubetsList;
    },

    async getAttributesByType(device_type: string) {
      await sleep(250);
      // const response = await api.get<ApiResponse, Attribute[]>(`attr/type/${device_type}`);
      const attrList = attrubetsList.filter((attr) => attr.device_type === device_type);
      return attrList;
    },

    async addAttribute(attr: AddAttributeDTO) {
      const uniqid = Date.now();
      const newAtr = {
        id: uniqid,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ...attr,
      } as Attribute;
      // const response = await api.post<ApiResponse, Attribute>("attr", attr);
      this.addAttributeInArray(newAtr);
      return newAtr;
    },

    async editAttribute({ id, ...payload }: editAttributeDTO) {
      // await api.put<ApiResponse>(`admin/attr/${id}`, payload);
      this.updateAttribute(id, payload as Attribute);
    },

    async deleteAttribute(id: number) {
      // await api.delete(`admin/attr/${id}`);
      this.deleteAttributeInArray(id);
    },

    updateAttribute(id: number, payload: Attribute) {
      let attrbute = this.attributes.find((attr) => attr.id === id);
      if (attrbute) {
        attrbute = Object.assign(attrbute, {
          ...payload,
        });
      }
    },

    deleteAttributeInArray(id: number) {
      this.attributes = this.attributes.filter((attr) => attr.id !== id);
    },

    addAttributeInArray(attribute: Attribute) {
      this.attributes.push(attribute);
    },
  },
});

export default useAttributesStore;
