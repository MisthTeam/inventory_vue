import { api } from "@/utils/api";
import { defineStore } from "pinia";
import { stringify } from "qs";

const useDevicesStore = defineStore({
  id: "devices",
  state: () => ({
    devices: {
      data: [] || null,
    },
  }),
  actions: {
    async getDevices(params) {
      if (!params.type) {
        delete params.type;
      }
      if (!params.search) {
        delete params.search;
      }
      const { response } = await api.get(`devices?${stringify(params)}`);
      return (this.devices = response);
    },
    async getDeviceByPn(pn) {
      const { response } = await api.get(`devices/pn/${pn}`);
      return response;
    },
    async deleteDevice(id) {
      await api.delete(`admin/device/${Number(id)}`);
    },
    async editDevice(id, payload) {
      await api.put(`admin/device/${Number(id)}`, payload);
    },
  },
});

export default useDevicesStore;
