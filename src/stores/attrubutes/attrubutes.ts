import { defineStore } from "pinia";

import { ApiResponse } from "@/interfaces/api.interface";
import { api } from "@/utils/api";
import { AddAttributeDTO, Attribute, editAttributeDTO } from "./types";

const useAttributesStore = defineStore({
  id: "attributes",
  state: () => ({
    attributes: [] as Attribute[],
  }),
  actions: {
    async getAttrubtes() {
      const reponse = await api.get<ApiResponse, Attribute[]>("attr");
      return reponse;
    },

    async getAttributesByType(device_type: string) {
      const response = await api.get<ApiResponse, Attribute[]>(`attr/type/${device_type}`);
      return response;
    },

    async addAttribute(attr: AddAttributeDTO) {
      const response = await api.post<ApiResponse, Attribute>("attr", attr);
      this.addAttributeInArray(response);
      return response;
    },

    async editAttribute({ id, ...payload }: editAttributeDTO) {
      await api.put<ApiResponse>(`admin/attr/${id}`, payload);
      this.updateAttribute(id, payload as Attribute);
    },

    async deleteAttribute(id: number) {
      await api.delete(`admin/attr/${id}`);
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
